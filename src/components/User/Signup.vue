<template>
  <v-container fluid fill-height>
    <v-layout align-top justify-center>
      <v-flex xs12 sm8 md4>
        <v-card max-width="344" height="100%" class="mx-auto">
          <v-card-title>Signup Form</v-card-title>
          <v-card-text>
            <v-form>
                <v-layout row px-2>
                    <v-icon left>mdi-account</v-icon>
                    <v-text-field label="Full Name" name="name" type="text" />
                </v-layout>
                <v-layout row px-2>
                    <v-icon left>mdi-email</v-icon>
                    <v-text-field label="Email" name="email" type="text" />
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
                <v-layout row px-2>
                    <v-icon left>mdi-check-circle-outline</v-icon>
                    <v-text-field
                        id="password"
                        label="Confirm Password"
                        name="password"
                        type="password"
                    />
                </v-layout>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn color="primary">Signup</v-btn>
          </v-card-actions>
          
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "signup"
};
</script>
