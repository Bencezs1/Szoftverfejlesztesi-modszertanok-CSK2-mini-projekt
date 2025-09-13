# Szoftverfejlesztési Módszertanok
## Követelmény Specifikáció
### CSK2
#### *Zsibók Bence, Kiss Álmos, Szabó Balázs, Majoros Máté*
---
### Áttekintés
Egy viccportál ahol egy nehéz egyetemi nap után a hallgatók jó vicceket tudnak olvasni és megosztani egymással.
### Jelenlegi helyzet
Jelenleg nincs a piacon olyan viccportál ami az egyetemisták szórakoztatását kívánjuk kiszolgálni.
### Vágyálom rendszer
Olyan viccportál létrehozása amely rendelkezni Webes, Androidos és iOS natív felülettel. Közösség fenn tudja tartani magát, megfelelő mennyiségű moderátorral. Integrált Facebook és Reddit megosztás. Facebook, Google, X (Twitter), Apple, DÁP, Ügyfélkapu+, Neptun, eduID bejelentkezési lehetőségek. Kommentelési lehetőségek. Kategóriák, tag-ek bevezetése és használata vicceken. Viccek keresése kulcsszavak, kategóriák alapján. Profil képek feltöltése.
### Követelménylista
|Modul|ID|Név|Verzió|Kifejtés|
|-----|--|---|------|--------|
|Felület|K1|Kezdőlap|v1.0|A legfrissebb viccek betöltése és megjelenítése.|
|Jogosultság|K2|Regisztráció|v1.0|A felhasználó a felhasználói nevének, email címének és jelszavának megadásával regisztrálja magát. A jelszó tárolása kódolva történik az adatbázisban.Ha valamelyik adat ezek közül hiányzik vagy nem felel meg a követelményeknek, akkor a rendszer értesíti erről a felhasználót.|
|Jogosultság|K3|Bejelentkezés|v1.0|A felhasználó az email címe és a jelszava segítségével bejelentkezhet. Ha a megadott email cím vagy jelszó nem megfelelő, akkor a felhasználó hibaüzenetet kap.|
|Felület|K4|Vicc Hozzáadás|v1.0|A viccek feltöltése/hozzáadása az oldalhoz regisztrált felhasználók által, amennyiben nincs regisztráció vagy nincs a felhasználó bejelentkezve, nem tud viccet feltölteni.|
|Felület|K5|Reszponzivitás|v1.0|Az oldalnak reszponzívnak kell lennie. Minden eszközről egyaránt elérhetőnek és olvashatónak kell lennie.|
|Statisztika|K6|Viccek értékelése|v1.0|A vicceket a felhasználók tudják értékelni gombok segítségével és a rendszer erről statisztát készít amelyet a felhasználók nem tudnak tekinteni.|
|Jogosultság|K7|Admin felület|v1.0|Egy felület melyen a felhasználók közül ki lehet jelölni moderátorokat, jóvá lehet hagyni vicceket, és el lehet távolítani sértő vagy spam bejegyzéseket.|
|Felület|K8|Menüsáv|v1.0|Bejelentkezés, Regisztráció gombok, saját feltöltött viccek megtekintése, kedvenc viccek megtekintése.|
Jogosultság|K9|Viccek szerkesztése|v1.0|Saját viccek szerkesztése.|
|Modifikáció|K10|Felhasználó törlés|v1.0|Minden felhasználónak joga van a saját fiókjának törlésére.|
|Jogosultság|K11|Felhasználó név|v1.0|Regisztációkor meg tud adni a felhasználó egy tetszőleges egyedi felhasználó nevet|
|Modifikáció|K12|Felhasználó név módosítása|v1.0|Regisztráció után a felhasználó meg tudja magának változtatni a felhasználó nevét|
|Modifikáció|K13|Jelszó módosítása|v1.0|Regisztráció után a felhasználó meg tudja magának változtatni a jelszavat|
### Riport
##### Hogyan működik a vicc posztolás?
- Regisztrálás/Bejelentkezés után a felhasználó egy gombra kattintva egy új viccet az adatbázisba mely megjelenik a többi felhasználó számára. Ezt a viccet később tudja szerkeszteni.
##### Ki milyen módon tudja a használni a felületet?
- Anonym felhasználó - Képes megtekinteni a weboldalt és a vicceket, de semmilyen változást nem tud eszközölni, nem tud értékelni, posztolni, kedvencelni.
- Felhasználó - Alap jogosultsági szint. Képes vicceket posztolni, kedvencelni, saját vicceit szerkeszteni és törölni.
- Moderátor - Minden jogosultsággal rendelkezik amivel a *felhasználó* és ezen felül képes jóváhagyni és törölni más felhasználók vicceit.
- Adminisztrátor - Minden jogosultsággal rendelkezik amivel a *moderátor* és ezen felül moderátori szerepkör kijelölése és elvétele.
### Fogalomtár
* Reszponzív felület - Mobilon, Tableten, PC-n igazodik a képernyőhöz a felület mérete, azaz több eszközön is probléma nélkül üzemelhet.
* Admin státusz - Kiemelt felhasználói jogosultsággal rendelkező felhaszálói állapot
* Moderátor - Kiemelt felhasználói jogkör, mely a többi felhasználó szabály betartását felügyeli és betartatja.
* Vicc - Rövid, rendszerint humoros történet, szöveg vagy kijelentés, amelynek célja a hallgató vagy olvasó megnevettetése.