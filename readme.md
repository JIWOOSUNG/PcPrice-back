# PCPrice Backend

PCPrice는 PC 부품의 가격을 비교하고, 리뷰 및 장바구니 기능을 제공하는 웹사이트입니다. 본 문서는 백엔드에 대한 설명을 담고 있습니다.

## 기술 스택

-   **프레임워크:** Node.js (Express.js)
    
-   **데이터베이스:** MySQL
    
-   **ORM/쿼리 빌더:** MySQL2
    
-   **인증 및 보안:** bcrypt, JWT
    
-   **환경 변수 관리:** dotenv
    
-   **API 테스트:** Postman
    

## 프로젝트 구조

```
backend/
├── controllers/        # 라우트 핸들러 (회원, 리뷰, 장바구니 등)
├── middleware/         # 인증 및 기타 미들웨어
├── models/             # 데이터베이스 모델 정의
├── routes/             # API 라우트 정의
├── services/           # 비즈니스 로직 (회원가입, 로그인 등)
├── utils/              # 유틸리티 함수 (암호화, 토큰 처리 등)
├── config/             # DB 및 환경 설정
└── server.js           # 서버 실행 엔트리 포인트

```

## 주요 기능

### 1. 회원 관리

-   회원가입 (`/api/auth/register`)
    
-   로그인 (`/api/auth/login`)
    
-   로그아웃 (클라이언트 측에서 토큰 삭제)
    
-   회원탈퇴 (`/api/auth/delete/:id`)
    

### 2. PC 부품 관리

-   부품 검색 (`/api/parts/search`)
    
-   부품 상세 조회 (`/api/parts/:id`)
    
-   부품 가격 비교 (`/api/parts/compare`)
    

### 3. 리뷰 관리

-   리뷰 작성 (`/api/reviews/add`)
    
-   리뷰 수정 (`/api/reviews/edit/:id`)
    
-   리뷰 삭제 (`/api/reviews/delete/:id`)
    
-   리뷰 조회 (`/api/reviews/:partId`)
    

### 4. 장바구니 관리

-   장바구니 추가 (`/api/cart/add`)
    
-   장바구니 조회 (`/api/cart`)
    
-   장바구니 삭제 (`/api/cart/remove/:id`)
    

### 5. 데이터 통계 및 이력 관리

-   인기 부품 조회 (`/api/stats/popular`)
    
-   가격 변동 조회 (`/api/stats/price-history/:partId`)
    
-   검색 이력 저장 및 조회 (`/api/history/search`)
    
-   비교 이력 저장 및 조회 (`/api/history/comparison`)
    

## 실행 방법

### 1. 환경 변수 설정

`.env` 파일을 생성하고 다음 내용을 추가하세요

```
DB_HOST=
DB_USER=
DB_PASSWORD=
DB_NAME=
JWT_SECRET=

```

### 2. 프로젝트 실행

```bash
# 패키지 설치
npm install

# 서버 실행 (개발 환경)
npm run dev

# 서버 실행 (운영 환경)
npm start

```
