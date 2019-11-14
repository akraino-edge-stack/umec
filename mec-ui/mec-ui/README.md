## Deployment instructions

Requirements: NodeJs v8

To deploy, mec-hackathon-widgets needs to be available for npm.
In mec-hackathon-widgets directory:
```bash
$ npm link
```

In mec-hackathon directory:
```bash
$ npm link mec-hackathon-widgets
```

Then deploy to generate code bundle under 'dist':
```bash
$ npm install
$ npm run deploy
```

Then Docker:
```bash
$ docker build . -t mec-ui
$ docker run --name mec-hackathon-ui -d -p 8080:80 mec-ui
```
