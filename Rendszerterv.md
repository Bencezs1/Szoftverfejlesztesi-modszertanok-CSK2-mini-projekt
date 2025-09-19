# Rendszerterv

1. __A rendszer célja__
   * A renduser célja, hogy egy fárasztó nap után a felhasználók ki tudjanak kapcsolódni, jó vicceket olvasni és megosztani egymással. Ezeket a vicceket a többi felhaszáló tudja értékelni.

2. __Projektterv__
   * Projektmunkások és felelősségek:
   * __Backend munkálatok__: Kiss Álmos, Majoros Máté
   * __Frontend munkálatok__: Zsibók Bence, Szabó Balázs
   * __Ütemterv__:
   * |Funció/Story|Feladat/Task|Prioritás|Becslés|Aktuális becslés|Eltelt idő|Hátralévő idő|
     |-------------|-----------|---------|-------|----------------|----------|-------------|
     |Követelmény specifikáció||0|12|12|12|0|
     |Funkcionális specifikáció||0|12|12|12|0|
     |Rendszerterv||0|16|16|8|8|
     |Adattárolás|Adatmodell megtervezése|0|4|4|4|0|
     ||Adatbázis megvalósítása a backenden|1|1|1|0|1|

3. __Üzleti folyamatok modellje__
   ![Üzleti folyamatok modellje](https://cdn.discordapp.com/attachments/1415986657282494497/1418480347578105876/PP1DJuGm48Rl_HKJxXkpN-voCMdiXA3GcbBSU6mGaIXYW3qP_xl0jeF6syFxzfbfUIzV1XXQwEhgTO3dkYkBeMu_c2s6jeCenyo0xQ5YdxPuirK96gCuCwXHm9SxbMUefqDdzvqgWPeRDOUD2xb8Opa5bdqpcXRSgNk41wKDJu9nuBal2zkNy1ZZQJgStwuf2xWGLoXY4roQpT88JD0Wg9DqtNRfD4x3NBvRyldMMYK8APSymXIbdxp_RL-UwvhhfKbK5FjrXtzNuVB9TSS_Yihzad3y3nMiLZVp8psD2no5H6kY3T6Ew42qPGqP3HaD6GqPdev48RFaMd8jkPPSIwwdFL78s0y0.png?ex=68ce4644&is=68ccf4c4&hm=d7b810ea6c648d9669320467394b0b3ddc25778242dd6a851b2dd4822133ca19&)

4. __Követelmények__
   * Funkcionális követelmények:
     * Felhasználó adatainak tárolása
     * Viccek tárolása
     * Viccek szerkesztése
     * Felhasználók módosítása
     * Felhasználók törlése
     * Felhasználó regisztrálása
     * Felhasználói szerepek módosítása
   * Nem funkcionális követelmények:
     * A felhasználók nem juthatnak hozzá más felhasználók személyes adataihoz a nevükön kívül.
     * A felhasználók nem módosíthatják mások vicceit
     * A felhasználók nem törölhetik mások vicceit.
     * A felhasználük jelszavai hashelve tárolandók
     * Alap védekezés SQL-Injection ellen
     * Reszponzív felhasználói felület
   * Törvényi előírások, szabványok:
     * GDPR-nek való megfelelés
  
5. __Funkcionális terv__
    __Rendszerszereplők__:
   * Admin
   * Felhasználó
   * Moderátor
   * Vendég
  
    __Rendszerhasználati esetek és lefutásaik__:
   * Admin:
     * Beléphet bármilyen szereplőként teljes hozzáférése van a rendszerhez
     * Viccek törlésére van lehetőségük
     * Felhasználók törlésére van lehetőségük
     * Mindent tud mint egy mezei felhasználó
   * Moderátor:
     * A felhaszálói szinten felül tudja menedzselni a vicceket
   * Felhasználó:
     * Vicceket tud létrehozni
     * Vicceket tud értékelni
     * Saját vicceket tud törölni
     * Saját vicceket tud módosítani
     * Viccket meg tud jelölni kedvencként
   * Vendég:
     * Vicceket tud nézni
     * Vicceket tud értékelni

    __Menü-hierarchiák__:
    * Bejelentkezés
      * Bejelentkezés
      * Regisztráció
    * Főoldal
      * Bejelentkezés
      * Profil szerkesztése
      * Új vicc létrehozása
      * Saját viccek
      * Kedvencek
6. __Fizikai környezet__
   * Az alkalmazás web platformra készül.
   * Fejlesztői eszközök:
     * Visual studio code
     * PyCharm
     * React
     * Django
     * SQLite
7. __Architekturális terv__
   * Backend:
     * A backend egy python libary nevezetesen a django keretrendszer álltal lesz megvalósítva. Az adatok tárolását egy, a djangó álltal alapból létrehozott SQLite adatbázisban fog megtörténni. A kliensekkel JSON objektumokkal kommunikál.
   * Frontend:
     * A frontend React keretrendszer használatával fogjuk megvalósítani.
  
8. __Implementációs terv__
   * A frontend React keretrendszer használatával fogjuk megvalósítani, amely főként javascript használatát jelent és az oldal stílusát css stíluslapok segítségével fogjuk megformázni. A Reactos frontend külömböző komponenseit külömböző fájlokba fogjuk implementálni, ezzel bitrosítva az újrafelhasznáhatóságot és az elszeparáltságot. Ezzel igyekszünk figyelembe venni azt, hogy egy komponensenk, csak egy feladata legyen. Az oldal kommunikálni fog a django által biztosított REST API-jal.