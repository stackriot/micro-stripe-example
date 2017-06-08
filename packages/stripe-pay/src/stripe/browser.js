import Promise from 'native-promise-only'
import stripeAsPromised from 'stripe-as-promised'
export default stripeAsPromised(window.Stripe, Promise)
