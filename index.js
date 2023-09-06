const { createInvoice } = require("./invoice.js");

const invoice = {
    shipping: {
      name: "John Doe",
      address: "1234 Main Street, Kedaulatan Jawir, Kota Hitam Pekat",
      phone: "+1 123123",
      email: "johndoe@example.com",
    },
    items: [
      {
        product: "Salicylic Acid",
        code: "#365147",
        quantity: 750,
        price: 544808,
        totalPrice: 56050373,
        imgUrl: "http://dummyimage.com/226x100.png/ff4444/ffffff",
      },
      {
        product: "levalbuterol inhalation",
        code: "#711681",
        quantity: 641,
        price: 389776,
        totalPrice: 17886842,
        imgUrl: "http://dummyimage.com/239x100.png/cc0000/ffffff",
      },
      {
        product: "Valacyclovir Hydroxyde",
        code: "#95f188",
        quantity: 873,
        price: 349372,
        totalPrice: 51713775,
        imgUrl: "http://dummyimage.com/103x100.png/cc0000/ffffff",
      },
      {
        product: "sitagliptin",
        code: "#c662c8",
        quantity: 927,
        price: 942526,
        totalPrice: 80435189,
        imgUrl: "http://dummyimage.com/194x100.png/cc0000/ffffff",
      },
      {
        product: "Octyocrelene Oxybenzone",
        code: "#fba17f",
        quantity: 714,
        price: 262234,
        totalPrice: 30925459,
        imgUrl: "http://dummyimage.com/188x100.png/5fa2dd/ffffff",
      },
      {
        product: "Chamomilla Mercurius",
        code: "#9f257f",
        quantity: 268,
        price: 153177,
        totalPrice: 3350728,
        imgUrl: "http://dummyimage.com/152x100.png/dddddd/000000",
      },
      {
        product: "Vitamin C",
        code: "#4fa87b",
        quantity: 897,
        price: 399893,
        totalPrice: 69152024,
        imgUrl: "http://dummyimage.com/135x100.png/ff4444/ffffff",
      },
      {
        product: "Lithium Carbonate",
        code: "#8a6654",
        quantity: 17,
        price: 494799,
        totalPrice: 98108876,
        imgUrl: "http://dummyimage.com/188x100.png/5fa2dd/ffffff",
      },
      {
        product: "Aspirin",
        code: "#58a174",
        quantity: 704,
        price: 662428,
        totalPrice: 84628065,
        imgUrl: "http://dummyimage.com/223x100.png/ff4444/ffffff",
      },
      {
        product: "Bicalutamide",
        code: "#9a2dc1",
        quantity: 227,
        price: 123044,
        totalPrice: 11962793,
        imgUrl: "http://dummyimage.com/100x100.png/ff4444/ffffff",
      },
    ],
    subtotal: 999696969,
    paid: 0,
    invoice_nr: 1234,
  };
  

createInvoice(invoice, "invoice.pdf");