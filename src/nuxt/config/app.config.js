export default Object.freeze({
    restaurantName: 'Restaurant',
    navbar: {
        menuButtons: [
            { text: 'Menu', path: '/menu', tooltip: 'View the Menu' },
            { text: 'Book', path: '/book', tooltip: 'Book a Table' },
            { text: 'Contact', path: '/contact', tooltip: 'Contact Us' }
        ],
        profileButtons: [
            { text: 'View Profile', path: '/profile' }
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
        maxNumberOfPeople: 12
    },
    text: {
        get home_title () {
            return `🍔 Welcome to ${this.parent.restaurantName}! 🌮`
        },
        get home_description () {
            return `Here at ${this.parent.restaurantName} we serve you the best food!`
        },
        get menu_title () {
            return `🍔 ${this.parent.restaurantName}'s Menu 🌮`
        },
        get book_title () {
            return `🍔 Book a table at ${this.parent.restaurantName}! 🌮`
        },
        book_form_title: 'Book a table 🍴'
    },
    images: {
        home_carousel: [
            'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg',
            'https://cdn.vuetifyjs.com/images/carousel/sky.jpg',
            'https://cdn.vuetifyjs.com/images/carousel/bird.jpg',
            'https://cdn.vuetifyjs.com/images/carousel/planet.jpg'
        ]
    },
    init () {
        this.text.parent = this
        delete this.init
        return this
    }
}.init())
