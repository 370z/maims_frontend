
export default function ({ store, redirect }) {
  if (this.auth.loggedIn) { return redirect('/'); }
}
