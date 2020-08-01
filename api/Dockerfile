FROM haskell AS builder

WORKDIR /src

ARG REVISION
RUN echo $REVISION > GIT-REVISION-FILE

ADD stack.yaml .
ADD stack.yaml.lock .
ADD package.yaml .
RUN mkdir src

RUN stack setup
RUN stack install --only-dependencies

ADD . /src
RUN stack install && cp $(stack path --local-bin)/all-o-stasis-api /usr/bin/

FROM haskell
COPY --from=builder /usr/bin/all-o-stasis-api /usr/bin
ENTRYPOINT ["/usr/bin/all-o-stasis-api"]
