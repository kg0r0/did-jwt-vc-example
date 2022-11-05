const createVerifiableCredentialJwt = require('did-jwt-vc').createVerifiableCredentialJwt;
const createVerifiablePresentationJwt = require('did-jwt-vc').createVerifiablePresentationJwt;
const EthrDID = require('ethr-did').EthrDID;

(async () => {
  const issuer = new EthrDID({
    identifier: '0xf1232f840f3ad7d23fcdaa84d6c66dac24efb198',
    privateKey: 'd8b595680851765f38ea5405129244ba3cbad84467d190859f4c8b20c1ff6c75'
  });

  const vcPayload = {
    sub: 'did:ethr:0x435df3eda57154cf8cf7926079881f2912f54db4',
    nbf: 1562950282,
    vc: {
      '@context': ['https://www.w3.org/2018/credentials/v1'],
      type: ['VerifiableCredential'],
      credentialSubject: {
        degree: {
          type: 'BachelorDegree',
          name: 'Baccalauréat en musiques numériques'
        }
      }
    }
  }
  const vcJwt = await createVerifiableCredentialJwt(vcPayload, issuer);
  console.log("[*] Verifiable Credential JWT: \n" + vcJwt);

  const vpPayload = {
    vp: {
      '@context': ['https://www.w3.org/2018/credentials/v1'],
      type: ['VerifiablePresentation'],
      verifiableCredential: [vcJwt]
    }
  }
  const vpJwt = await createVerifiablePresentationJwt(vpPayload, issuer);
  console.log("[*] Verifiable Presentation JWT: \n" + vpJwt);
})();