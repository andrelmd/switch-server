# Switch Server API

**🇧🇷 Português** | [🇺🇸 English](README.en.md)

## 📋 Sobre o Projeto

API backend para **automatização de configuração de múltiplos switches em uma rede** utilizando uma SBC (Single Board Computer) com gerência remota e sistema web. Este projeto fornece uma interface RESTful para controlar e gerenciar switches TP-Link TL-SG108E através de suas interfaces web.

O sistema permite a configuração centralizada e automatizada de switches de rede, incluindo controle de portas, configuração de QoS (Quality of Service), gerenciamento de bandwidth e outras funcionalidades essenciais de rede.

## ✨ Funcionalidades

### Gerenciamento de Dispositivos
- ✅ Cadastro e armazenamento de switches na rede
- ✅ Listagem de dispositivos cadastrados com paginação
- ✅ Consulta de configurações individuais por dispositivo
- ✅ Persistência de dados em SQLite

### Controle Remoto de Switches TP-Link TL-SG108E
- ✅ **Autenticação automática** no switch via web interface
- ✅ **Configuração de nome do dispositivo**
- ✅ **Controle de estado das portas** (habilitar/desabilitar)
- ✅ **Configuração de velocidade das portas** (Auto, 10M, 100M)
- ✅ **Controle de Flow Control**
- ✅ **Configuração de QoS (Quality of Service)**
  - Modo Port-Based
  - Controle de bandwidth por porta (ingress/egress)
- ✅ **Salvamento de configurações** na memória não-volátil
- ✅ **Reinicialização remota** do switch

### Segurança e Autenticação
- ✅ Autenticação JWT (JSON Web Tokens)
- ✅ Tokens de acesso com expiração configurável
- ✅ Refresh tokens em cookies HTTP-Only
- ✅ Proteção de rotas com middleware de autenticação
- ✅ CORS configurável para integração com frontend

## 🏗️ Arquitetura

O projeto segue uma arquitetura modular e bem definida:

```
switch-server-1/
├── app/
│   ├── main.py              # Aplicação FastAPI principal
│   ├── config.py            # Configurações e variáveis de ambiente
│   ├── constants.py         # Constantes da aplicação
│   ├── utils.py             # Utilitários (JWT, database)
│   ├── models/              # Modelos de dados (SQLModel)
│   │   ├── common_model.py  # Modelos de autenticação
│   │   └── device_model.py  # Modelos de dispositivos e portas
│   ├── routers/             # Endpoints da API
│   │   ├── auth.py          # Rotas de autenticação
│   │   └── device.py        # Rotas de gerenciamento de dispositivos
│   └── services/            # Lógica de negócio
│       └── switch_service.py # Serviço de comunicação com switches
├── requirements.txt         # Dependências Python
├── .env.example            # Exemplo de configuração
└── database.db             # Banco de dados SQLite
```

### Tecnologias Utilizadas

- **FastAPI** - Framework web moderno e de alta performance
- **SQLModel** - ORM baseado em Pydantic e SQLAlchemy
- **PyJWT** - Autenticação via JSON Web Tokens
- **Pydantic Settings** - Gerenciamento de configurações
- **Requests** - Cliente HTTP para comunicação com switches
- **Pytest** - Testes automatizados
- **SQLite** - Banco de dados leve e eficiente

## 🚀 Instalação e Configuração

### Pré-requisitos

- Python 3.10 ou superior
- pip (gerenciador de pacotes Python)

### Passo a Passo

1. **Clone o repositório**
```bash
git clone https://github.com/andrelmd/switch-server
cd switch-server-1
```

2. **Crie um ambiente virtual**
```bash
python -m venv .venv
source .venv/bin/activate  # Linux/Mac
# ou
.venv\Scripts\activate  # Windows
```

3. **Instale as dependências**
```bash
pip install -r requirements.txt
```

4. **Configure as variáveis de ambiente**
```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas configurações:

```bash
# Credenciais do administrador da API
API_ADMIN_USER=admin
API_ADMIN_PASSWORD=sua_senha_segura

# Chave secreta JWT (gere uma com: openssl rand -hex 32)
SECRET_KEY=sua_chave_secreta_aqui

# Configurações de tokens
ACCESS_TOKEN_EXPIRE_MINUTES=15
REFRESH_TOKEN_EXPIRE_DAYS=7

# Configurações da aplicação
APP_NAME=Switch Server API
DEBUG=true
ALLOWED_HOSTS='["localhost", "127.0.0.1"]'
```

5. **Execute a aplicação**
```bash
# Modo desenvolvimento com auto-reload
fastapi dev app/main.py

# Modo produção
fastapi run app/main.py
```

A API estará disponível em `http://localhost:8000`

## 📚 Documentação da API

### Documentação Interativa

Após iniciar o servidor, acesse:

- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

### Endpoints Principais

#### Autenticação

**POST** `/api/auth/v1/login`
- Realiza login e retorna tokens de acesso
- Body: `username` e `password` (form-data)
- Retorna: `access_token` e define `refresh_token` em cookie HTTP-Only

**GET** `/api/auth/v1/me`
- Retorna informações do usuário autenticado
- Requer: Bearer token no header Authorization

**POST** `/api/auth/v1/refresh`
- Renova o access token usando o refresh token
- Requer: Cookie `refresh_token`

#### Dispositivos (Switches)

**POST** `/api/devices/v1`
- Cadastra um novo switch
- Requer autenticação
- Body:
```json
{
  "ip_address": "192.168.1.100",
  "name": "Switch-Principal",
  "username": "admin",
  "password": "senha_do_switch"
}
```

**GET** `/api/devices/v1`
- Lista todos os switches cadastrados
- Suporta paginação: `?offset=0&limit=100`

**GET** `/api/devices/v1/{device_id}`
- Retorna detalhes de um switch específico

### Health Check

**GET** `/health`
- Verifica se a API está operacional
- Não requer autenticação

## 🔧 Uso do SwitchService

O `SwitchService` é uma classe Python que abstrai a comunicação com a interface web do switch TP-Link TL-SG108E. Ele utiliza um padrão de context manager para gerenciar automaticamente login e logout.

### Exemplo de Uso

```python
from app.models.device_model import Device
from app.services.switch_service import SwitchService, SwitchServiceError

# Criar objeto Device (pode vir do banco de dados)
device = Device(
    ip_address="192.168.1.100",
    name="Switch-Lab",
    username="admin",
    password="admin"
)

try:
    # Usar como context manager
    with SwitchService(device) as switch:
        # Alterar nome do switch
        switch.set_device_name("Switch-Laboratorio-01")
        
        # Desabilitar porta 1
        switch.set_port_state(port_id=1, enabled=False)
        
        # Habilitar porta 2 com velocidade 100M
        switch.set_port_state(port_id=2, enabled=True, speed=4)
        
        # Configurar QoS
        switch.set_qos_mode_port_based()
        switch.set_qos_bandwidth(
            port_number=3,
            ingress_rate_kbps=10000,  # 10 Mbps
            egress_rate_kbps=10000
        )
        
        # Salvar configurações
        switch.save_config()
        
except SwitchServiceError as e:
    print(f"Erro ao configurar switch: {e}")
```

### Métodos Disponíveis

- `login()` - Autentica no switch
- `logout()` - Encerra a sessão
- `set_device_name(name: str)` - Altera o nome do switch
- `set_port_state(port_id, enabled, speed, flow_control)` - Configura uma porta
  - `port_id`: Número da porta (1-8)
  - `enabled`: True/False
  - `speed`: 1=Auto, 2=10MH, 3=10MF, 4=100MH, 5=100MF, 6=1000MF
  - `flow_control`: True/False
- `set_qos_mode_port_based()` - Ativa QoS baseado em porta
- `set_qos_bandwidth(port_number, ingress_rate_kbps, egress_rate_kbps)` - Configura bandwidth
- `save_config()` - Salva configurações na memória não-volátil
- `reboot(save_before_reboot=False)` - Reinicia o switch

## 🧪 Testes

Execute os testes automatizados:

```bash
# Executar todos os testes
pytest

# Executar com verbose
pytest -v

# Executar testes específicos
pytest app/routers/test_auth.py
pytest app/services/test_switch_service.py
```

## 🔒 Segurança

### Práticas Implementadas

- ✅ Tokens JWT com expiração configurável
- ✅ Refresh tokens em cookies HTTP-Only (protegidos contra XSS)
- ✅ Senha armazenada em variável de ambiente
- ✅ CORS configurável para controlar origens permitidas
- ✅ HTTPS recomendado para produção

### Recomendações para Produção

1. **Gere uma SECRET_KEY forte**:
```bash
openssl rand -hex 32
```

2. **Configure ALLOWED_HOSTS** com os domínios corretos

3. **Desabilite DEBUG** em produção:
```bash
DEBUG=false
```

4. **Use HTTPS** com certificado válido

5. **Configure firewall** para limitar acesso à API

## 🌐 Integração com Frontend

Esta API foi projetada para trabalhar em conjunto com um frontend web. Configure o CORS adequadamente:

```python
# Em .env
ALLOWED_HOSTS='["https://seu-dominio.com", "https://app.seu-dominio.com"]'
```

O frontend pode consumir a API usando:
- Axios ou Fetch API
- Autenticação via Bearer token
- Cookies automáticos para refresh token

## 📝 Variáveis de Ambiente

| Variável | Descrição | Padrão | Obrigatório |
|----------|-----------|--------|-------------|
| `API_ADMIN_USER` | Usuário administrador da API | admin | ✅ |
| `API_ADMIN_PASSWORD` | Senha do administrador | admin | ✅ |
| `SECRET_KEY` | Chave secreta para JWT | secret_key | ✅ |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | Expiração do access token | 15 | ❌ |
| `REFRESH_TOKEN_EXPIRE_DAYS` | Expiração do refresh token | 7 | ❌ |
| `APP_NAME` | Nome da aplicação | Switch Server API | ❌ |
| `DEBUG` | Modo debug | false | ❌ |
| `ALLOWED_HOSTS` | Origens CORS permitidas | ["*"] | ❌ |
| `SQLITE_FILE_NAME` | Nome do banco SQLite | database.db | ❌ |
| `SQLITE_FILE_PATH` | Caminho do banco SQLite | ./ | ❌ |

## 🤝 Contribuindo

Contribuições são bem-vindas! Para contribuir:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request
