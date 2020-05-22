# 웹팩을 이용한 코드 스플리팅

## 왜 합니까

- vendor/main 으로 청킹하는 방법이 일반적
- 외부모듈은 딱히 변화가 없으므로 브라우저에 캐싱되서 재사용하기 편함, 이렇게 분리된 파일을 청크파일이라고 부름
- 하지만 앱이 크면 main.js도 매우 크기 때문에 더 잘게 나눠줘야할 필요가 생긴다
- 모든 페이지에서 사용되지 않는 모듈들이 main에 같이 번들링 되어있으면 별도로 js파일로 분리해서 필요할때만 챙겨오는게 낫다

## 동적 import

- **동적 import는 프로미스를 리턴한다**

```JSX
async handleClick = () => {
 const modal = await import('./Modal');
 this.setState({
   Modal : modal.default
 })
}
```

- `import` 키워드를 함수처럼 사용하게 되면 웹팩이 해당 경로에 맞는 컴포넌트를 청크파일로 **알아서** 분리해준다.
- 위처럼해주면 Modal 컴넌은 청크파일로 분리되어서 버튼이 클릭되어 handleClick이 실행될 때 동적으로 로드된다.
- default라는 키워드는 어떻게 작동하는거지

## optimization 설정

```js
optimization : {
    splitChunks:{
        // 동적 임포트만 코드를 분할해라, 'all' : 모두
        // 원래 디폴트 설정이기도 해서, 딱히 다른 설정을 하지 않은 경우 ESM 동적 임포팅을 사용하면 코드분할이 된다... 로 이해해도 무방
        chunks:'async',
        // 파일 크기가 몇 이상인 모듈만 분할 대상이다
        minSize:30000,
        // 한개 이상의 청크에 포함되어 있어야 한다
        minChunks:1,
        // 파일 분할은 그룹별로, 기본적으로 vendors(외부 모듈), default(내부 모듈)
        // 외부 모듈이 브라우저에 오래 키상됨
        cacheGroups:{
            // 캐시되는 그룹들을 설정해줌(이름은 뭐든 가능)
            // 모듈, 패키지들을 별도로 분할해줄 수 있게 그룹을 지정해주는 단계다
            // 정규표현식으로 어떤 확장자, 폴더명 그룹화할건지 설정
            default:{
                // 내부 모듈은 두개 이상의 번들 파일에 포함되어야 분할됨
                minChunks:2,
                priority:-20,
                reuseExistingChunk:true
            },
            vendors:{
                test:/[\\/]node_modules[\\/]/,
                priority:1
            },
            reactBundle: {
                test:/[\\/]node_modules[\\/]/(react|react-dom)[\\/]/,
                name:'react-bundle',
                priority:2,
                minSize:100
            }

        }
    }
}
```

- 청크 == 번들파일
- 진입점부터 시작해서 조건에 맞게 코드를 분할한다
- SplitChunksPlugin은 기본적으로 코드 분리시 중복을 예방하는 플러그인임. chunks를 all로 놓고 빌드하면 진입점에 해당하는 코드들 청크로 분리하고, 그 중복 코드도 새로운 청크로 분리해서 내놓는다

## 리액트에서의 라우터 코드 스플리팅

## 실습(바닐라 상태에서)
1. 웹팩 초기 설정(엔트리, 아웃풋, 로더...) + 빌드 해보기
2. html 작성 + 클릭 이벤트 달기
3. 웹팩에 코드 스플리팅 설정하기
4. 빌드해서 결과물 보기
