FROM lopsided/archlinux

RUN pacman -Syu --noconfirm rustup gcc openssl pkgconf
RUN rustup toolchain install nightly
RUN rustup default nightly

EXPOSE 8000

WORKDIR /home/webserver

ADD ./ ./

RUN cargo build --release

CMD cargo run --release
