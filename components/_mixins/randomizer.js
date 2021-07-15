/**
 * A mixin to generates random values or shuffles an array.
 */
export const Randomizer = {
    methods: {
        /**
         * Generate random number between provided min and max value.
         * min and max value are possible to be returned.
         * @param {Number} min Bottom level of the random number.
         * @param {Number} max Top level of the random number.
         * @returns {Number}
         */
        randomNumber(min, max) {
            if (max <= min) {
                max = min + 1;
            }
            return Math.floor(Math.random() * (max - min + 1)) + min;
        },

        /**
         * Generate number between provided min and max value.
         * min and max value are not included.
         * @param {Number} min Bottom level of the random number.
         * @param {Number} max Top level of the random number.
         */
        randomNumberBetween(min = 1, max = 10) {
            min -= 1;
            max -= 1;
            return this.randomNumber(min, max);
        },

        /**
         * Shuffle an array.
         * @param {Array} array Array to be shuffled.
         * @returns {Array}
         */
        shuffleArray: function shuffle(array) {
            var currentIndex = array.length, randomIndex;

            // While there remain elements to shuffle...
            while (0 !== currentIndex) {

                // Pick a remaining element...
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex--;

                // And swap it with the current element.
                [array[currentIndex], array[randomIndex]] = [
                    array[randomIndex], array[currentIndex]];
            }

            return array;
        }
    }
}