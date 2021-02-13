# 왜?
1. graphQL을 잘 이해했는가를 확인
2. express의 graphql 서버를 만들 수 있는 법을 숙달
3. DB와 잘 연결할 수 있는지 확인
4. React의 기본을 잘 응용할 수 있는지 확인

# 어떻게?
## graphQL 서버
1. express-graphql 서버를 만든다.
2. graphQL Schema
3. graphQL Resolver
4. DB와 연결. mongo? PSQL?

## React 클라이언트
1. 클라이언트를 만들고 서버의 uri와 연결한다.
2. graphical로 data를 잘 받고 넣을 수 있는지 확인한다.
3. React component들 만들고
4. gql tag로 Query문과 Mutation문을 만든다.
5.  data를 state로 잘 운용할 수 있는지 확인

## mongoDB 데이터베이스
1. mongoose.Schema로 mongoDB 스키마를 정의한다.
2. mongoose.model로 모델을 만들고, Resolver쪽에서 import한다.
3. 구체적인 validation
4. ? : DB간의 관계를 만드는데 미숙하다. ref도 그렇고 그냥 schemaType을 잘 모른다.

# 문제점
## validation : collection끼리의 관계 
만약 기존 DB에 없던 레스토랑 id로 리뷰를 만들려는 접근이 있을 때, 제약이 걸려야 한다. 
1. DB끼리 관계를 만들기. foreign key 혹은 ref. 확실하게 일대일 매칭을 시킬 수 있을 것이다. 예외가 있나?
2. Mutation에서 해당 collection에서 findById()를 한 후에 에러 메세지 던지기.
## 