<template>
  <v-container fluid fill-height>
    <v-layout align-top justify-center>
      <v-flex xs12 sm8 md4>
        <v-card max-width="344" height="100%" class="mx-auto">
          <v-card-title>Login Form</v-card-title>
          <v-card-text>
            <v-form>
                <v-layout row px-2>
                    <v-icon left>mdi-account</v-icon>
                    <v-text-field label="Email" name="login" type="text" />
                </v-layout>
                <v-layout row px-2>
                    <v-icon left>mdi-lock</v-icon>
                    <v-text-field
                        id="password"
                        label="Password"
                        name="password"
                        type="password"
                    />
                </v-layout>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn text small rounded color="indigo">Forgot Password</v-btn>
            <v-spacer />
            <v-btn color="primary">Login</v-btn>
          </v-card-actions>
          <v-divider class="divider"></v-divider>
          <v-card-text class="social-media-login" align="center">
              Or Login with Social Media
          </v-card-text>
          <v-layout justify-center>
              <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn icon large target="_blank" v-on="on">
                <v-icon outline color="red">mdi-google</v-icon>
              </v-btn>
            </template>
            <span>Login with google</span>
          </v-tooltip>
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn
                icon
                large
                href="https://facebook.com"
                target="_blank"
                v-on="on"
              >
                <v-icon outline color="blue darken-2">mdi-facebook-box</v-icon>
              </v-btn>
            </template>
            <span>Login with facebook</span>
          </v-tooltip>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "login"
};
</script>

<style>
.social-media-login {
    margin-top: 8px;
}
.divider {
    margin-top:50px;
}
</style>
