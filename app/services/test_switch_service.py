import pytest
import requests_mock

from app.models.device_model import Device
from app.services.switch_service import SwitchService


@pytest.fixture
def mock_device():
    """Creates a mock Device instance for testing."""
    return Device(
        id=1,
        ip_address="127.0.0.1:8000",
        username="admin",
        password="password123",
        name="Test Switch",
    )


def test_set_port_state(mock_device):
    """
    Test that set_port_state sends the correct GET request parameters
    and headers to the switch endpoint.
    """
    service = SwitchService(mock_device)
    expected_url = f"http://{mock_device.ip_address}/port_setting.cgi"

    with requests_mock.Mocker() as mock:
        mock.get(expected_url, text="Success", status_code=200)

        service.set_port_state(port_id=2, enabled=False)

        assert mock.called
        assert mock.call_count == 1

        history = mock.request_history[0]

        assert history.method == "GET"

        assert history.url.startswith(expected_url)

        qs = history.qs
        assert qs["portid"] == ["2"]
        assert qs["state"] == ["0"]
        assert qs["speed"] == ["1"]
        assert qs["flowcontrol"] == ["0"]
        assert qs["apply"] == ["apply"]

        assert (
            history.headers["Referer"]
            == f"http://{mock_device.ip_address}/PortSettingRpm.htm"
        )
        assert "Mozilla" in history.headers["User-Agent"]


def test_login(mock_device):
    """
    Test that login sends the correct POST request parameters
    and headers to the switch endpoint.
    """
    service = SwitchService(mock_device)
    expected_url = f"http://{mock_device.ip_address}/logon.cgi"

    with requests_mock.Mocker() as mock:
        mock.post(expected_url, text="Success", status_code=200)

        service.login()

        assert mock.called
        assert mock.call_count == 1

        history = mock.request_history[0]

        assert history.method == "POST"

        assert history.url.startswith(expected_url)
        assert history.url.endswith("/logon.cgi")
        assert history.url == expected_url

        assert history.headers["Content-Type"] == "application/x-www-form-urlencoded"
        assert "Mozilla" in history.headers["User-Agent"]
