export interface PaymentLinkResponse {
    description: string
    capacity: number
    active: boolean
    return_url: string
    failure_return_url: string
    send_customer_receipt: boolean
    custom_data: CustomData
    amount_currency: string
    platform: string
    prefilled_customer: PrefilledCustomer
    title: string
    external_id: any
    hold_and_charge_later: boolean
    name: string
    enable_tabby: boolean
    is_widget: boolean
    link_type: string
    id: string
    amount: number
    max_amount: any
    processing_fee_percentage: number
    processing_fee_amount: any
    enable_message: boolean
    enable_tips: boolean
    enable_quantity: boolean
    payment_methods: string[]
    rules: Rules
    enable_customer_details: boolean
    payment_url: string
    save_card: string
    subscription: any
    payouts_share: any
  }
  
  export interface CustomData {}
  
  export interface PrefilledCustomer {}
  
  export interface Rules {
    allowed: any[]
  }
  