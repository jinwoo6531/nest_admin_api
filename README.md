개발 상황

Store

1. Store 로그인(@Post('/signin')) - jwt Cookie 방식으로 구현

2. Store 로그아웃(@Post('/logout'))

3. Store 인증(@Post('/auth')) - 웹에서 로그인 유지를 위해 추가하였습니다.

Product

1. Product 판매중 목록(@Get())

- 로그인한 store id값으로 where절을 추가하여 목록을 불러오기.
