# Car Rental Project
steps to follow to configure 
1. npm install
2. look and install all the packages in package .json 
3. To use bootstrap and fontawsome paste the given in styles in angular .json 
"styles": [
              "./node_modules/bootstrap/dist/css/bootstrap.min.css",
              "src/styles.css",
              "node_modules/@fortawesome/fontawesome-free/css/all.css"
            ]
4. Run the frontend using npm start or ng serve
5. DB setup 
   1. Migration is already present in the project just run update-database in package manager console
6. Run the backend 
7. admin creds will be automatically seeded into db after running backend
8. Sign up the user using signup pass {
    points to remember 
    1. password should of atleast length of 8
    including one in caps letter , one special character like @ , one number
    
    for example user {
        Email : abcd@gmail.com,
        Password : Passwod@123
    },
    {
        Email : test@gmail.com,
        Password : Test@123
    }
}
9. Admin will add all the cars after login with admin creds 
{
    "UserEmail": "myadmin@test.com",
    "UserPassword": "Test@321",
} Admin creds can be found in backend folder in appsettings.development.json
10. Once the car rental order is placed by the user. User will mark it as req for return on ending rental date than Admin need to login using his creds to accept return.

11. Car images url should be of jpg or jpeg 
few images link for reference 
https://www.v3cars.com/media/model-imgs/1625904661-Mahindra-Thar.jpg


https://cdni.autocarindia.com/ExtraImages/20210708102327_Aventador_ultimae.jpg

https://stimg.cardekho.com/images/carexteriorimages/930x620/Hyundai/Creta/10544/1689588616959/front-left-side-47.jpg?imwidth=890&impolicy=resize

https://cars.tatamotors.com/Images/hexa/gallery/hexa-gallery-3-3.jpg

12. Enjoy the Project.