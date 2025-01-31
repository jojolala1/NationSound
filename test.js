/////////////////////////////////////////////

// const array = [1,2,3,4,5]

// const result = array.reduce((accumulateur, valeurActuel) => {
//     return accumulateur+valeurActuel  //cette fonction est appelé a chaques iteration mais accumulateur "accumule"
// }, 0)//ce chiffre represente la valeur initial

/////////////////////////////////////////

// const words = ['apple','banana','cherry'];

// const result = words.reduce((acc,x)=>{
//     return acc + x.length;
// },0)

//////////////////////////////////////////

// const cart = [
//     {product: 'Apple', price: 1.2, quantity: 4, category: 'catégorie 1'},
//     {product: 'potatos', price: 2.2, quantity: 2, category: 'catégorie 2'},
//     {product: 'bannana', price: 1.7, quantity: 7, category: 'catégorie 1'},
//     {product: 'cherry', price: 4.2, quantity: 2, category: 'catégorie 1'},
//     {product: 'carrote', price: 0.2, quantity: 1, category: 'catégorie 2'},
//     {product: 'chicken', price: 3.5, quantity: 1, category: 'catégorie 3'}
// ]

// const result = cart.reduce((acc, x)=> {
//     return acc + (x.price * x.quantity)
// },0)

/////////////////////////////////////////////

// const phrase = 'hello world';

// const tabPhrase = phrase.split('').filter((letter)=> letter !== ' ')

// const result = tabPhrase.reduce((acc,letter) => {
//     if(!acc[letter]){
//         acc[letter] = 0
//     }
//     acc[letter] +=1
//     return acc
// },{})

/////////////////////////////////////////

// const sales = [
//     {seller: 'Alice', amount: 120},
//     {seller: 'Bob', amount: 90},
//     {seller: 'Alice', amount: 150},
//     {seller: 'Charlie', amount: 200},
//     {seller: 'Bob', amount: 120},
//     {seller: 'Alice', amount: 180},
//     {seller: 'Charlie', amount: 130}
// ]

// const result = sales.reduce((acc,x) => {
//     if(!acc[x.seller]){
//         acc[x.seller] = 0
//     }
//     acc[x.seller] += x.amount
//     return acc
// },{})

//////////////////////////////////////////

const students = [
    { name: "Alice", grades: { math: 85, sciences: 92, litterature: 78 } },
    { name: "Bob", grades: { math: 90, sciences: 88, litterature: 84 } },
    { name: "Charlie", grades: { math: 77, sciences: 95, litterature: 91 } },
];

const result = students.reduce(
    (acc, x) => {
        const grades = Object.values(x.grades);

        const average =
            grades.reduce((acc, x) => {
                return acc + x;
            }) / grades.length;

        if (average > acc.average) {
            return { name: x.name, average: average };
        } else return acc;
    },
    { name: "", average: 0 }
);

console.log(result);
