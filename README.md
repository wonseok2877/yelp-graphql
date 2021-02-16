# 왜?
1. graphQL을 잘 이해했는가를 확인
2. express의 graphql 서버를 만들 수 있는 법을 숙달
3. DB와 잘 연결할 수 있는지 확인
4. React의 기본을 잘 응용할 수 있는지 확인

# 모르는 것
## React 이해도 부족
- <mark> Hooks</mark>부터 배워야 함. React를 모르니까 Apollo client도 헷갈릴 수 밖에 . 
- 페이지끼리 data혹은 state를 어떻게 주고 받을 것인가
- <mark>렌더링 개념
- useEffect
- useContext
-  기본적으로 DOM을 다루는 법. onChange, onClick, onSubmit등과 그 안에서 함수, 인자값 만드는 법.
-  props 개념
-  react-router-dom의 Link
## Mongoose 이해도 부족
- graphQL resolver는 별 거  없다. MVC의 controller 역할. 결국 DB에 어떻게 잘 접근하고 data를 잘 응용하느냐 문젠데, 전반적으로 아는게 없음.
- <mark>기본 DB 함수들</mark>
## Apollo Client 이해가 없음
- <mark> useQuery가 Hook이라는 것과 useState와 충돌한다는 것.</mark>
- <mark> Cache 쓰는 방법 모름</mark>
- <mark> Apollo Context 모름</mark>
- update()
- refetch()
- readQuery와 writeQuery
- cache 개념
- gql 태그 : 다른건 알겠는데 $문법 헷갈림.

## validation : collection끼리의 관계 
만약 기존 DB에 없던 레스토랑 id로 리뷰를 만들려는 접근이 있을 때, 제약이 걸려야 한다. 
- DB끼리 관계를 만들기. foreign key 혹은 ref. 확실하게 일대일 매칭을 시킬 수 있을 것이다. 예외가 있나?
- 
# 아는 것
## graphQL 서버
1. express-graphql 서버를 만든다.
2. graphQL Schema
3. graphQL Resolver
4. DB와 연결. 

## React 클라이언트
1. 클라이언트를 만들고 서버의 uri와 연결한다.
2. graphical로 data를 잘 받고 넣을 수 있는지 확인한다.
3. React component들 만들고
4. gql tag로 Query문과 Mutation문을 만든다.
5.  data를 state로 잘 운용할 수 있는지 확인

## mongoDB 데이터베이스
1. mongoose.Schema로 mongoDB 스키마를 정의한다.
2. mongoose.model로 모델을 만들고, Resolver쪽에서 import한다.
-  Mutation에서 해당 collection에서 findById()를 한 후에 에러 메세지 던지기.