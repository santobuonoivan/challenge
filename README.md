# challenge

Descripción corta o resumen de tu proyecto.

## Requisitos Previos

Antes de comenzar, asegúrate de tener instalado Node.js y npm en tu sistema. Puedes descargarlos desde [el sitio oficial de Node.js](https://nodejs.org/).

## Instalación

1. Clona este repositorio o descarga el código fuente.

   ```bash
   git clone https://github.com/santobuonoivan/challenge
   ```

   ```bash
   cd challenge
   ```

   ejemplo de queries graphql

   ```bash
   mutation create {
   createProduct( data:{
       name: "rtyrty",
       price: 1000,
       amount: 10,
       code: "A123ryrty"
   }
       ) {
       name
       price
       amount,
       code,
       id
   }
   }

   query list {
   returnAllProduct(sortBy: "code", sortDirection: "asc" ) {
       amount
       name
       price
       code
   }
   }

   mutation createSale {
   createSale ( data: {
       client_name: "cliente1",
       price: 0,
       products: [
           {
           amount: 100000,
           price: 999999,
           product: "64f26aa67a646bb5f4aede00"
           }
       ]
   }
   ),{
       price
       client_name
       products {
       amount
       price
       }
   }
   }
   query MostProfitableProduct {
   mostProfitableProduct {
       amount
       code
       name
       price
       id
   }
   }

   query MostSoldProduct {
   mostSoldProduct {
       amount,
       code
       name
       price
       id
   }
   }
   ```
