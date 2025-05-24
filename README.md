# Sistema de Controle Financeiro - Clínica de Estética

Sistema desenvolvido para gerenciamento financeiro de clínica de estética, incluindo controle de clientes, procedimentos, agendamentos e finanças.

## Tecnologias Utilizadas

<<<<<<< HEAD
- Java 21
- Spring Boot 3.3.0
=======
- Java 17
- Spring Boot 3.2.3
>>>>>>> fcc7b13eb49da7bf91a970bebad2018b9587b896
- Spring Data JPA
- Spring Security
- PostgreSQL
- Thymeleaf
- Lombok
- Maven

## Requisitos

<<<<<<< HEAD
- Java 21 ou superior
=======
- Java 17 ou superior
>>>>>>> fcc7b13eb49da7bf91a970bebad2018b9587b896
- PostgreSQL
- Maven

## Configuração do Banco de Dados

1. Criar banco de dados:
```sql
CREATE DATABASE beauty_clinic_finance_db;
```

2. Configurar usuário:
```sql
CREATE USER daniel WITH PASSWORD 'toor';
GRANT ALL PRIVILEGES ON DATABASE beauty_clinic_finance_db TO daniel;
```

## Executando o Projeto

1. Clone o repositório
2. Execute o comando:
```bash
mvn spring-boot:run
```

3. Acesse a aplicação em:
```
http://localhost:8080
```

## Estrutura do Projeto

```
com.beautyclinic.finance
├── config/
├── controller/
├── model/
├── repository/
├── service/
├── dto/
├── exception/
├── security/
└── util/
```
