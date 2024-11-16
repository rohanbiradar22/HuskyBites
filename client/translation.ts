interface DictionaryEntry {
  login_form_header: string;
  email: string;
  password: string;
  forgot_password_text: string;
  not_registered_text: string;
  sign_up_here: string;
  otp_form_text: string;
  send_otp: string;
  back_to_login: string;
  sign_up_form_header: string;
  sign_up_text: string;
  term_and_condition: string;
  already_have_account: string;
  login_in_here: string;
  first_name: string;
}

export const dictionary: Record<string, DictionaryEntry> = {
  en: {
    login_form_header: "Sign In",
    email: "Email",
    password: "Password",
    forgot_password_text: "Forgot Password?",
    not_registered_text: "Not Registered?",
    sign_up_here: "SignUp Here",
    otp_form_text: "Please enter email to get otp",
    send_otp: "Send Otp",
    back_to_login: "Back to Login",
    sign_up_form_header: "Sign Up",
    sign_up_text: "Please register to create an account",
    term_and_condition: "I accept all terms & conditions",
    already_have_account: "Already have an account?",
    login_in_here: "Login Now",
    first_name: "First Name"
  },
  es: {
    login_form_header: "Iniciar sesión",
    email: "Correo electrónico",
    password: "Contraseña",
    forgot_password_text: "Has olvidado tu contraseña?",
    not_registered_text: "No registrado?",
    sign_up_here: "Registrate aquí",
    otp_form_text: "Por favor ingrese el correo electrónico para obtener otp",
    send_otp: "Enviar OTP",
    back_to_login: "Atrás para iniciar sesión",
    sign_up_form_header: "Inscribirse",
    sign_up_text: "Por favor regístrese para crear una cuenta",
    term_and_condition: "Acepto todos los términos y condiciones",
    already_have_account: "Ya tienes una cuenta?",
    login_in_here: "Inicia sesión ahora",
    first_name: "Nombre de pila"
  },
};
