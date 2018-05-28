const socialUserResponse = {
    provider: 'google',
    email: 'test@test.com',
    name: 'test',
    image: 'http://test.png',
    token: '',
    idToken: '90900900909090900909'
};
export class GoogleAuthStub  {
    initialize() {
        return new Promise((resolve) => {
            resolve(socialUserResponse);
        });
    }

    drawUser() {}

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

    revokeUserScope() {}å
}
