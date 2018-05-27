const socialUserResponse = {
    provider: 'google',
    email: 'test@test.com',
    name: 'test',
    image: 'http://test.png',
    token: '',
    idToken: '90900900909090900909'
};
export class AuthStub  {
    signIn(provider: any) {
        return new Promise((resolve) => {
            resolve(socialUserResponse);
        });
    }

    signOut() {
        return new Promise((resolve) => {
            resolve(null);
        });
    }
}
