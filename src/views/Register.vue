<template>
  <form class="border-wrapper w-50 p-5">
    <h1 class="title mb-2">Let's Get Started</h1>
    <p class="subtitle mb-4">Fill in the form below to register your account</p>
    <div class="form-group">
      <input
        type="text"
        class="form-control p-3"
        id="username"
        aria-describedby="usernameHelp"
        placeholder="Username"
      />
      <small id="usernameHelp" class="form-text text-right">
        Username already exists
      </small>
    </div>
    <div class="form-group">
      <input
        type="email"
        class="form-control p-3"
        id="email"
        aria-describedby="emailHelp"
        placeholder="Email"
      />
      <small id="emailHelp" class="form-text text-right">
        Invalid email format
      </small>
    </div>
    <div class="form-group">
      <input
        type="password"
        class="form-control p-3"
        id="password"
        aria-describedby="passwordHelp"
        placeholder="Password"
      />
      <small id="passwordHelp" class="form-text text-right">
        Password must be at least 6 characters
      </small>
    </div>
    <div class="form-group">
      <input
        type="password"
        class="form-control p-3"
        id="confirmPassword"
        aria-describedby="confirmPasswordHelp"
        placeholder="Re-type your password"
      />
      <small id="confirmPasswordHelp" class="form-text text-right">
        Password confirmation doesn't match
      </small>
    </div>
    <button class="btn my-2 w-100" type="submit">Sign up</button>
    <p class="footer-note">
      Already have an account ?
      <router-link class="footer-redirect" to="/login">Login here</router-link>
    </p>
  </form>
</template>

<style scoped lang="scss">
@import '@/assets/scss/color.scss';

.border-wrapper {
  border-radius: 14px;
}

.border-wrapper, .form-control {
  border: 1px solid $LIGHT_GREY;
}

.btn {
  background: $PURPLE;
  color: $WHITE;
  font-size: 12px;
  font-weight: 500;
}

.btn, .form-control {
  height: 41px;
}

.footer-note, .subtitle {
  color: $GREY;
}

.footer-redirect {
  color: $PURPLE;
  font-weight: 500;
}

.footer-redirect:hover {
  text-decoration: none;
}

.form-control {
  font-size: 12px;
}

.form-control::placeholder {
  color: $LIGHT_GREY;
  font-size: 12px;
}

.form-text {
  color: $RED;
}

.subtitle {
  font-size: 10px;
}

.subtitle, .title {
  text-align: left;
}

.title {
  font-size: 24px;
  font-weight: 500;
}
</style>
