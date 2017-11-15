# 스도쿠 게임
---
## 적용한 번호 생성 알고리즘(알고리즘이라 하기도 민망)?

- 랜덤한 1~9까지 숫자 생성한다.
- 생성한 숫자를 2차원 배열의[x][y]중 첫x열은 그대로 배열에 넣고 다음줄 부터는 x열을 +1 시켜서 한칸씩 뒤로 넣는다.
- 대충 이런식으로 나온다. (알아보기 쉽게 하기 위해 정렬하여 나열)

| 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |
| - | - | - | - | - | - | - | - | - |
| 9 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 |
| 8 | 9 | 1 | 2 | 3 | 4 | 5 | 6 | 7 |
| 7 | 8 | 9 | 1 | 2 | 3 | 4 | 5 | 6 |
| 6 | 7 | 8 | 9 | 1 | 2 | 3 | 4 | 5 |
| 5 | 6 | 7 | 8 | 9 | 1 | 2 | 3 | 4 |
| 4 | 5 | 6 | 7 | 8 | 9 | 1 | 2 | 3 |
| 3 | 4 | 5 | 6 | 7 | 8 | 9 | 1 | 2 |
| 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 1 |

- 이렇게 나온 상태에서 배열의[x][y]중 x열을 (0,3,6)(1,4,7)(2,5,8) 순으로 놓는다.

| 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |
| - | - | - | - | - | - | - | - | - |
| 7 | 8 | 9 | 1 | 2 | 3 | 4 | 5 | 6 |
| 4 | 5 | 6 | 7 | 8 | 9 | 1 | 2 | 3 |
| 9 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 |
| 6 | 7 | 8 | 9 | 1 | 2 | 3 | 4 | 5 |
| 3 | 4 | 5 | 6 | 7 | 8 | 9 | 1 | 2 |
| 8 | 9 | 1 | 2 | 3 | 4 | 5 | 6 | 7 |
| 5 | 6 | 7 | 8 | 9 | 1 | 2 | 3 | 4 |
| 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 1 |

- 이상태가 기본 스도쿠틀이다.
- 이상태에서 배열의[x][y]중 y열을 섞어 주는데 (0,1,2)(3,4,5)(6,7,8)끼리만 섞어준다.
- 그럼 스토쿠 게임판이 완성된다.
- 완성된 게임판에서 랜덤부분 숫자를 안보이게 해주면 끝.
