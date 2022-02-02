import colors from 'vuetify/es5/util/colors'

export default Object.freeze({
    restaurantName: 'Restaurant',
    restaurantSupportEmail: 'support@restaurant.com',
    navbar: {
        menuButtons: [
            { text: 'Menu', path: '/menu', tooltip: 'View the Menu' },
            { text: 'Book', path: '/book', tooltip: 'Book a Table' },
            { text: 'Contact', path: '/contact', tooltip: 'Contact Us' }
        ],
        profileButtons: [
            { text: 'View Profile', path: '/profile' },
            { text: 'Log Out', color: 'red', action: 'user/logout' }
        ]
    },
    home_buttons: [
        { text: 'View Menu', path: '/menu', color: 'primary', tooltip: 'View the Menu' },
        { text: 'Book table', path: '/book', color: 'primary', outlined: true, tooltip: 'Book a Table' }
    ],
    bookings: {
        openingTime: '09:00',
        closingTime: '22:00',
        bookingTimeInterval: 30,
        bookingDuration: 90,
        maxNumberOfPeople: 12
    },
    text: {
        // Home
        get home_title () {
            return `🍔 Welcome to ${this.parent.restaurantName}! 🌮`
        },
        get home_description () {
            return `Here at ${this.parent.restaurantName} we serve you the best food!`
        },
        // Menu
        get menu_title () {
            return `🍔 ${this.parent.restaurantName}'s Menu 🌮`
        },
        // Booking
        get book_title () {
            return `🍔 Book a table at ${this.parent.restaurantName}! 🌮`
        },
        book_form_title: 'Book a table 🍴',
        // Contact Us
        get contact_title () {
            return `🍔 Contact ${this.parent.restaurantName} 🌮`
        },
        get contact_description () {
            return `Hi! If you'd like to contact us, feel free to send an email to ${this.parent.restaurantSupportEmail}`
        },
        // Basket
        basket_title: 'Your Basket',
        // Profile
        profile_title: 'Your Profile',
        // Login
        login_title: 'Log In 🍟',
        // Register
        register_title: 'Register 🍦',
        // Admin
        admin_title: 'Admin Area 🧙'
    },
    images: {
        home_carousel: [
            'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg',
            'https://cdn.vuetifyjs.com/images/carousel/sky.jpg',
            'https://cdn.vuetifyjs.com/images/carousel/bird.jpg',
            'https://cdn.vuetifyjs.com/images/carousel/planet.jpg'
        ]
    },
    admin_config: {
        profileButton: { text: 'Admin Menu', color: 'text--darken-4 amber', path: '/admin' },
        colorTheme: {
            light: {
                primary: colors.green,
                accent: colors.green.darken3
            },
            dark: {
                primary: colors.green.darken2,
                accent: colors.green.darken3
            }
        },
        dataTable: {
            shopNumberOfLastOrders: 21,
            showBookingsDaysAhead: 2
        }
    },
    init () {
        this.text.parent = this
        delete this.init
        return this
    }
}.init())
