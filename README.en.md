# Switch Server API

[🇧🇷 Português](README.md) | **🇺🇸 English**

## 📋 About the Project

Backend API for **automated configuration of multiple network switches** using an SBC (Single Board Computer) with remote management and web system. This project provides a RESTful interface to control and manage TP-Link TL-SG108E switches through their web interfaces.

The system enables centralized and automated configuration of network switches, including port control, QoS (Quality of Service) configuration, bandwidth management, and other essential networking functionalities.

## ✨ Features

### Device Management
- ✅ Switch registration and storage in the network
- ✅ Paginated device listing
- ✅ Individual device configuration queries
- ✅ SQLite data persistence

### Remote Control of TP-Link TL-SG108E Switches
- ✅ **Automatic authentication** to switch via web interface
- ✅ **Device name configuration**
- ✅ **Port state control** (enable/disable)
- ✅ **Port speed configuration** (Auto, 10M, 100M)
- ✅ **Flow Control management**
- ✅ **QoS (Quality of Service) configuration**
  - Port-Based mode
  - Per-port bandwidth control (ingress/egress)
- ✅ **Configuration saving** to non-volatile memory
- ✅ **Remote reboot** of the switch

### Security and Authentication
- ✅ JWT (JSON Web Tokens) authentication
- ✅ Access tokens with configurable expiration
- ✅ Refresh tokens in HTTP-Only cookies
- ✅ Route protection with authentication middleware
- ✅ Configurable CORS for frontend integration

## 🏗️ Architecture

The project follows a modular and well-defined architecture:

```
switch-server-1/
├── app/
│   ├── main.py              # Main FastAPI application
│   ├── config.py            # Settings and environment variables
│   ├── constants.py         # Application constants
│   ├── utils.py             # Utilities (JWT, database)
│   ├── models/              # Data models (SQLModel)
│   │   ├── common_model.py  # Authentication models
│   │   └── device_model.py  # Device and port models
│   ├── routers/             # API endpoints
│   │   ├── auth.py          # Authentication routes
│   │   └── device.py        # Device management routes
│   └── services/            # Business logic
│       └── switch_service.py # Switch communication service
├── requirements.txt         # Python dependencies
├── .env.example            # Configuration example
└── database.db             # SQLite database
```

### Technologies Used

- **FastAPI** - Modern, high-performance web framework
- **SQLModel** - ORM based on Pydantic and SQLAlchemy
- **PyJWT** - JSON Web Tokens authentication
- **Pydantic Settings** - Configuration management
- **Requests** - HTTP client for switch communication
- **Pytest** - Automated testing
- **SQLite** - Lightweight and efficient database

## 🚀 Installation and Setup

### Prerequisites

- Python 3.10 or higher
- pip (Python package manager)

### Step by Step

1. **Clone the repository**
```bash
git clone <repository-url>
cd switch-server-1
```

2. **Create a virtual environment**
```bash
python -m venv .venv
source .venv/bin/activate  # Linux/Mac
# or
.venv\Scripts\activate  # Windows
```

3. **Install dependencies**
```bash
pip install -r requirements.txt
```

4. **Configure environment variables**
```bash
cp .env.example .env
```

Edit the `.env` file with your settings:

```bash
# API administrator credentials
API_ADMIN_USER=admin
API_ADMIN_PASSWORD=your_secure_password

# JWT secret key (generate one with: openssl rand -hex 32)
SECRET_KEY=your_secret_key_here

# Token settings
ACCESS_TOKEN_EXPIRE_MINUTES=15
REFRESH_TOKEN_EXPIRE_DAYS=7

# Application settings
APP_NAME=Switch Server API
DEBUG=true
ALLOWED_HOSTS='["localhost", "127.0.0.1"]'
```

5. **Run the application**
```bash
# Development mode with auto-reload
fastapi dev app/main.py

# Production mode
fastapi run app/main.py
```

The API will be available at `http://localhost:8000`

## 📚 API Documentation

### Interactive Documentation

After starting the server, access:

- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

### Main Endpoints

#### Authentication

**POST** `/api/auth/v1/login`
- Performs login and returns access tokens
- Body: `username` and `password` (form-data)
- Returns: `access_token` and sets `refresh_token` in HTTP-Only cookie

**GET** `/api/auth/v1/me`
- Returns authenticated user information
- Requires: Bearer token in Authorization header

**POST** `/api/auth/v1/refresh`
- Renews access token using refresh token
- Requires: `refresh_token` cookie

#### Devices (Switches)

**POST** `/api/devices/v1`
- Registers a new switch
- Requires authentication
- Body:
```json
{
  "ip_address": "192.168.1.100",
  "name": "Main-Switch",
  "username": "admin",
  "password": "switch_password"
}
```

**GET** `/api/devices/v1`
- Lists all registered switches
- Supports pagination: `?offset=0&limit=100`

**GET** `/api/devices/v1/{device_id}`
- Returns details of a specific switch

### Health Check

**GET** `/health`
- Checks if the API is operational
- Does not require authentication

## 🔧 Using the SwitchService

The `SwitchService` is a Python class that abstracts communication with the TP-Link TL-SG108E switch web interface. It uses a context manager pattern to automatically handle login and logout.

### Usage Example

```python
from app.models.device_model import Device
from app.services.switch_service import SwitchService, SwitchServiceError

# Create Device object (can come from database)
device = Device(
    ip_address="192.168.1.100",
    name="Lab-Switch",
    username="admin",
    password="admin"
)

try:
    # Use as context manager
    with SwitchService(device) as switch:
        # Change switch name
        switch.set_device_name("Laboratory-Switch-01")
        
        # Disable port 1
        switch.set_port_state(port_id=1, enabled=False)
        
        # Enable port 2 with 100M speed
        switch.set_port_state(port_id=2, enabled=True, speed=4)
        
        # Configure QoS
        switch.set_qos_mode_port_based()
        switch.set_qos_bandwidth(
            port_number=3,
            ingress_rate_kbps=10000,  # 10 Mbps
            egress_rate_kbps=10000
        )
        
        # Save configuration
        switch.save_config()
        
except SwitchServiceError as e:
    print(f"Error configuring switch: {e}")
```

### Available Methods

- `login()` - Authenticates to the switch
- `logout()` - Ends the session
- `set_device_name(name: str)` - Changes the switch name
- `set_port_state(port_id, enabled, speed, flow_control)` - Configures a port
  - `port_id`: Port number (1-8)
  - `enabled`: True/False
  - `speed`: 1=Auto, 2=10MH, 3=10MF, 4=100MH, 5=100MF, 6=1000MF
  - `flow_control`: True/False
- `set_qos_mode_port_based()` - Activates port-based QoS
- `set_qos_bandwidth(port_number, ingress_rate_kbps, egress_rate_kbps)` - Configures bandwidth
- `save_config()` - Saves configuration to non-volatile memory
- `reboot(save_before_reboot=False)` - Reboots the switch

## 🧪 Testing

Run automated tests:

```bash
# Run all tests
pytest

# Run with verbose output
pytest -v

# Run specific tests
pytest app/routers/test_auth.py
pytest app/services/test_switch_service.py
```

## 🔒 Security

### Implemented Practices

- ✅ JWT tokens with configurable expiration
- ✅ Refresh tokens in HTTP-Only cookies (protected against XSS)
- ✅ Password stored in environment variable
- ✅ Configurable CORS to control allowed origins
- ✅ HTTPS recommended for production

### Production Recommendations

1. **Generate a strong SECRET_KEY**:
```bash
openssl rand -hex 32
```

2. **Configure ALLOWED_HOSTS** with the correct domains

3. **Disable DEBUG** in production:
```bash
DEBUG=false
```

4. **Use HTTPS** with a valid certificate

5. **Configure firewall** to limit API access

## 🌐 Frontend Integration

This API was designed to work together with a web frontend. Configure CORS appropriately:

```python
# In .env
ALLOWED_HOSTS='["https://your-domain.com", "https://app.your-domain.com"]'
```

The frontend can consume the API using:
- Axios or Fetch API
- Authentication via Bearer token
- Automatic cookies for refresh token

## 📝 Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `API_ADMIN_USER` | API administrator username | admin | ✅ |
| `API_ADMIN_PASSWORD` | Administrator password | admin | ✅ |
| `SECRET_KEY` | JWT secret key | secret_key | ✅ |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | Access token expiration | 15 | ❌ |
| `REFRESH_TOKEN_EXPIRE_DAYS` | Refresh token expiration | 7 | ❌ |
| `APP_NAME` | Application name | Switch Server API | ❌ |
| `DEBUG` | Debug mode | false | ❌ |
| `ALLOWED_HOSTS` | CORS allowed origins | ["*"] | ❌ |
| `SQLITE_FILE_NAME` | SQLite database name | database.db | ❌ |
| `SQLITE_FILE_PATH` | SQLite database path | ./ | ❌ |

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the project
2. Create a branch for your feature (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Open a Pull Request
