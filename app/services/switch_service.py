from typing import Dict
from urllib.parse import urljoin

import requests
import urllib3

from app.models.device_model import Device

urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)


class SwitchServiceError(Exception):
    """Custom exception for SwitchService errors."""

    pass


class SwitchService:
    """
    A service to interact with the web interface of a TP-Link switch (specifically TL-SG108E).

    This service uses a `requests.Session` to maintain login state via cookies.
    It is designed to be used as a context manager to ensure login and logout
    are always executed.

    Usage example:
        device = Device(...)
        try:
            with SwitchService(device) as switch:
                switch.set_device_name("New-Switch-Name")
                switch.set_port_state(port_id=1, enabled=False)
                switch.save_config()
        except SwitchServiceError as e:
            print(f"An error occurred: {e}")
    """

    def __init__(self, device: Device):
        if not device.ip_address:
            raise ValueError("The device must have an IP address.")

        self.device = device
        self.base_url = f"http://{self.device.ip_address}/"
        self.session = requests.Session()

        # Common headers to simulate a browser, as per curl commands
        self.session.headers.update(
            {
                "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                "Accept-Language": "pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7,gl;q=0.6",
                "Cache-Control": "max-age=0",
                "Connection": "keep-alive",
                "Content-Type": "application/x-www-form-urlencoded",
                "Upgrade-Insecure-Requests": "1",
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36",
            }
        )

    def _make_request(
        self,
        method: str,
        endpoint: str,
        referer: str | None = None,
        headers: Dict[str, str] | None = None,
        **kwargs,
    ):
        url = urljoin(self.base_url, endpoint)
        print(f"Making request to {url}")
        request_header = {} if headers is None else headers
        if referer:
            request_header["Referer"] = urljoin(self.base_url, referer)

        try:
            response = self.session.request(
                method, url, headers=request_header, verify=False, timeout=10, **kwargs
            )
            response.raise_for_status()
            return response
        except requests.exceptions.RequestException as e:
            raise SwitchServiceError(
                f"Failed to execute request to switch at {url}: {e}"
            ) from e

    def login(self):
        """Logs into the switch to establish a session."""
        payload = {
            "username": self.device.username,
            "password": self.device.password,
            "logon": "Login",
        }
        self._make_request(
            "POST",
            "logon.cgi",
            referer=self.base_url,
            headers={"Content-Type": "application/x-www-form-urlencoded"},
            data=payload,
        )

    def logout(self):
        """Logs out of the switch session."""
        self._make_request("GET", "Logout.htm", referer="Menu.htm")

    def set_device_name(self, name: str):
        """Changes the system name of the switch."""
        params = {"sysName": name}
        self._make_request(
            "GET", "system_name_set.cgi", referer="SystemInfoRpm.htm", params=params
        )

    def set_port_state(
        self, port_id: int, enabled: bool, speed: int = 1, flow_control: bool = False
    ):
        """
        Enables or disables a specific port.
        - port_id: The port number (e.g., 1, 2, 3...).
        - enabled: True to enable, False to disable.
        - speed: 1 for 'Auto' (default). 2 for 10MH, 3 for 10MF, 4 for 100MH, 5 100MF, 6 for 100MF.
        - flow_control: True to enable, False to disable.
        """
        params = {
            "portid": port_id,
            "state": 1 if enabled else 0,
            "speed": speed,
            "flowcontrol": 1 if flow_control else 0,
            "apply": "Apply",
        }
        self._make_request(
            "GET", "port_setting.cgi", referer="PortSettingRpm.htm", params=params
        )

    def save_config(self):
        """Saves the current configuration to the switch's non-volatile memory."""
        payload = {"action_op": "save"}
        self._make_request(
            "POST",
            "savingconfig.cgi",
            referer="SavingConfigRpm.htm",
            headers={"Content-Type": "application/x-www-form-urlencoded"},
            data=payload,
        )

    def reboot(self, save_before_reboot: bool = False):
        """Reboots the switch."""
        payload = {
            "reboot_op": "reboot",
            "save_op": "true" if save_before_reboot else "false",
        }
        self._make_request(
            "POST",
            "reboot.cgi",
            referer="SystemRebootRpm.htm",
            headers={"Content-Type": "application/x-www-form-urlencoded"},
            data=payload,
        )

    def set_qos_mode_port_based(self):
        """Sets the QoS mode to 'Port-Based'."""
        payload = {"rd_qosmode": 0, "qosmode": "Apply"}
        self._make_request(
            "POST",
            "qos_mode_set.cgi",
            referer="QosBasicRpm.htm",
            headers={"Content-Type": "application/x-www-form-urlencoded"},
            data=payload,
        )

    def set_qos_bandwidth(
        self, port_number: int, ingress_rate_kbps: int, egress_rate_kbps: int
    ):
        """
        Sets bandwidth control (QoS) for a specific port.
        Note: The `sel_X=1` parameter indicates which port checkbox is checked in the UI.
        """
        payload = {
            "igrRate": ingress_rate_kbps,
            "egrRate": egress_rate_kbps,
            f"sel_{port_number}": 1,
            "applay": "Apply",
        }
        self._make_request(
            "POST",
            "qos_bandwidth_set.cgi",
            referer="QosBandWidthControlRpm.htm",
            headers={"Content-Type": "application/x-www-form-urlencoded"},
            data=payload,
        )

    def __enter__(self):
        """Context manager entry: logs into the switch."""
        self.login()
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        """Context manager exit: logs out of the switch."""
        self.logout()
