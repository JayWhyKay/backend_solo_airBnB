'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    return queryInterface.bulkInsert('Reviews', [
      { userId: 1,
        spotId: 3,
        review: "Sol to Soul is a luminous, secluded sanctuary on 10-acres of mythic boulders in Pioneertown, one of the most historic, storied and desirable locations in the Mojave Desert",
        stars: 3
      },
      { userId: 1,
        spotId: 4,
        review: "Joshua Trees and the geological phenomena of massive granite boulders that stack skyward in sculptural feats as far as the eye can see.",
        stars: 4
      },
      { userId: 1,
        spotId: 5,
        review: "Either way, you cannot help but leave differently than you arrived. Deserts have always been steeped in mysticism and the awakening of clarity, awe and transformation… a place where the Phoenix comes to set itself on fire and the Alchemist to learn how to become the wind.",
        stars: 5
      },
      { userId: 1,
        spotId: 6,
        review: "At sunset, you’ll definitely want to dip into the salt water hot tub, and then hop over to the firepit to dry off and start cocktail hour. With Pappy’s, Red Dog and La Copine (reviewed by the NYTimes as a “dining room run with joy and exuberance”) all within 20 minutes, we like to do dinner out at least one night (or as take away). And cook in the rest of the time.",
        stars: 4
      },
      { userId: 2,
        spotId: 1,
        review: "Like Joshua Tree National Park – a designated International Dark Sky Park – Sol is blessed with deeply dark nights that allow the Milky Way to shine boldly right over the house.",
        stars: 3
      },
      { userId: 2,
        spotId: 2,
        review: "We've sometimes said it's almost feels as if the cosmos has come for a conversation. And who’s to say it hasn't?",
        stars: 4
      },
      { userId: 2,
        spotId: 5,
        review: "The bedrooms feature king-sized beds with pure Dunlop Latex mattresses and pillow tops (all natural from trees, no chemicals or metal coils); organic cotton and linen bedding; floor-to-ceiling sliders so that you may sleep with a view of the moon and stars – or black-out curtains if you prefer.",
        stars: 5
      },
      { userId: 2,
        spotId: 6,
        review: "Tucked into the shelter of a giant boulder, there is a deck with a top-of-the-line Hot Springs salt water hot tub, outdoor shower and cozy seating area with some of the most amazing views at Sol to Soul.",
        stars: 4
      },
      { userId: 3,
        spotId: 1,
        review: "There are sun loungers on the master bedroom deck.",
        stars: 3
      },
      { userId: 3,
        spotId: 2,
        review: "On the main deck there is an outdoor living room with the Alejandro Artigas designed Zig Zag sofa from Artless, Philippe Starck Bubble Chairs and a firepit.",
        stars: 4
      },
      { userId: 3,
        spotId: 3,
        review: "There is also a teak-dining table with seating for 6. There is another teak dining table inside by German designer E15, also with seating for six.",
        stars: 5
      },
      { userId: 3,
        spotId: 4,
        review: "The house is equipped with a state-of-the-art radiant heating and A/C system; Wifi; fire sprinkler system; smoke and carbon monoxide detectors.",
        stars: 4
      },
      { userId: 1,
        spotId: 1,
        review: "During your stay you may see lizards, cotton tail rabbits, jack rabbits, coyote, hawks, snakes, bob cats, crows, quail and all kinds of other desert birds.",
        stars: 5
      },
      { userId: 1,
        spotId: 1,
        review: "Whatever you are moved to do or not do, let go of or allow to come in while you are here, we wish you a beautiful, blessed, joyful, magical, transformative and memorable stay at Sol to Soul… where we welcome you to dream, play, burn, be and love.",
        stars: 4
      },
      { userId: 1,
        spotId: 1,
        review: "If you can’t check into your home and the Host cannot resolve the issue, we’ll find you a similar or better home for the length of your original stay, or we’ll refund you.",
        stars: 5
      },
      { userId: 1,
        spotId: 1,
        review: "In the unlikely event a Host needs to cancel your booking within 30 days of check-in, we’ll find you a similar or better home, or we’ll refund you.",
        stars: 4
      },
      { userId: 2,
        spotId: 2,
        review: "If at any time during your stay you find your listing isn't as advertised—for example, the refrigerator stops working and your Host can’t easily fix it, or it has fewer bedrooms than listed—you'll have three days to report it and we’ll find you a similar or better home, or we’ll refund you.",
        stars: 3
      },
      { userId: 2,
        spotId: 2,
        review: "If you ever feel unsafe, you’ll get priority access to specially-trained safety agents, day or night.",
        stars: 4
      },
      { userId: 2,
        spotId: 2,
        review: "Completely walled and hedged in for privacy, Shelby Sands is like checking in to your own private Palm Springs resort compound! ",
        stars: 5
      },
      { userId: 2,
        spotId: 2,
        review: "The pool, spa and covered lounge patio, plus many of the interior rooms, have gorgeous views of the San Jacinto Mountains to the West.",
        stars: 5
      },
      { userId: 4,
        spotId: 2,
        review: "Once you're situated, you may never want to leave, except perhaps to check out the nearby restaurants and bars, just a block or two way.",
        stars: 5
      },
      { userId: 4,
        spotId: 2,
        review: "Property is professionally managed, guests are required to sign an additional contract with property manager.",
        stars: 5
      }
      ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Reviews', null, {});
  }
};
