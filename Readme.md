# Cấu trúc thư mục
#### Backend
```
├───src
│   ├───main
│   │   ├───java
│   │   │   └───com
│   │   │       └───jp
│   │   │           └───mainichishinpo
│   │   │               ├───controller  //handle signup/login requests & authorized requests
│   │   │               ├───entity
│   │   │               ├───payload  // defines classes for Request and Response objects
│   │   │               │   ├───request
│   │   │               │   └───response
│   │   │               ├───repository   //  has intefaces that extend Spring Data JPA JpaRepository to interact with Database.
│   │   │               ├───security  // Config Spring Security and implement Security Object
│   │   │               │   ├───jwt
│   │   │               │   └───services
│   │   │               └───service

```

### Frontend
```
├───app
│   ├───Dashboard
│   │   ├───board-admin
│   │   ├───board-moderator
│   │   └───board-user
│   ├───home
│   ├───login
│   ├───profile
│   ├───register
│   ├───_helpers
│   └───_services
└───assets
```

### Link tham khảo JWT 
[SpringBoot + Angulart + JWT] {https://www.bezkoder.com/spring-boot-login-example-mysql/}

![Flow JWT](https://www.bezkoder.com/wp-content/uploads/angular-14-spring-boot-jwt-authentication-authorization-flow.png)
![Component Diagram with Router and HttpInterceptor](https://www.bezkoder.com/wp-content/uploads/angular-14-jwt-authentication-authorization-overview.png)

#### Error 401 Full authentication is required to access this resource
![Error 401](https://www.bezkoder.com/wp-content/uploads/spring-security-refresh-token-jwt-spring-boot-flow.png)