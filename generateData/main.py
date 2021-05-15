from faker import Faker
from random import randint, choice
from datetime import timedelta, datetime, date

fake = Faker('ru_RU')

def generateNumber(count = 10):
    return (''.join(str(randint(0, 9)) for _ in range(count)))

def uniqueGenerateNumber(lst):
    while True:
        number = generateNumber()
        if number not in lst:
            return number

def generateListNumber(count = 1000):
    listNumber = []
    for _ in range (count):
        listNumber.append(uniqueGenerateNumber(listNumber))
    return listNumber

def generatePerson(passports, driverLicenses):
    sex = choice(['муж', 'жен'])
    name = fake.name_male() if sex == 'муж' else fake.name_female()
    birthdate = fake.date()
    tmp = list(map(int, birthdate.split('-')))
    passport = uniqueGenerateNumber(passports) if calculate_age(date(tmp[0],tmp[1],tmp[2])) >= 14 else 'null'
    driverLicense = uniqueGenerateNumber(driverLicenses) if calculate_age(date(tmp[0],tmp[1],tmp[2]))>= 18 and choice([True, False]) else 'null'

    passports.append(passport)
    driverLicenses.append(driverLicense)

    return dict(name=name, sex=sex, birthdate = birthdate, passport = passport, driverLicense = driverLicense)

def generatePeople(count = 1000):
    people = []
    passports = []
    driverLicenses = []
    for _ in range (count):
        people.append(generatePerson(passports, driverLicenses))
    return people


def calculate_age(born):
    today = date.today()
    return today.year - born.year - ((today.month, today.day) < (born.month, born.day))

def generateOneTS(people, registerNumbers):
    typeTSData = ['легковой автомобиль', 'грузовой автомобиль', 'мотоцикл', 'трамвай', 'автобус', 'троллейбус',
                  'поезд', 'гужевой транспорт', 'велосипед']
    markaLAuto = ['Alpha Romeo', 'Aston Martin', 'Audi', 'Bentley', 'BMW', 'Bugatti',
                  'Cadillac', 'Chevrolet', 'Chery', 'Citroen', 'Corvette', 'Daewoo', 'Ferrari',
                  'Ford', 'Haval', 'Honda', 'Hyundai', 'Infinity', 'Jaguar', 'Jeep', 'Kamaz',
                  'KIA', 'Lada', 'Lifan', 'Lamborghini', 'Land Rover', 'Lexus', 'Mazda', 'Mini',
                  'Mercedes-Benz', 'Mitsubishi', 'Nissan', 'Opel', 'Peugeot', 'Porsche', 'Renault',
                  'Skoda', 'Suzuki', 'Tesla', 'Tayota', 'UAZ', 'Volvo', 'Volkswagen']
    markaGAuto = ['Тонор', 'БелАз', 'MAN', 'KAMAZ', 'MAZ', 'Foton']
    markaTrain = ['Уралтрансмаш', 'Рузхиммаш', 'Новокузнецкий ВСЗ', 'Метровагонмаш', 'Коломенский завод']
    markaBus = ['ГАЗ', 'ЗИЛ', 'ЛАЗ', 'РАФ']
    markaBicycle = ['Eltreco', 'KHE', 'Maxiscoo', 'Polisport', 'Scott', 'Stern', 'Trek']
    markaAnimal = ['Лошади', 'Волы', 'Буйволы', 'Ослы', 'Мулы', 'Собаки', 'Олени', 'Овцы']
    markaMotocycle = ['Hero', 'Irbis', 'Suzuki', 'BMW', 'Harley-Davidson', 'Triumph', 'Kawasaki', 'Honda',
                      'Yamaha', 'Ducati']

    color = ['красный', 'оранжевый', 'желтый', 'зеленый', 'голубый', 'синий', 'фиолетовый',
             'розовый', 'белый', 'черный', 'золотой', 'серебристый', 'коричневый']

    while True:
        ownerId = randint(0, len(people) - 1)
        if people[ownerId]['passport'] != 'null':
            break

    while True:
        typeTS = choice(typeTSData)
        p = randint(0, 100)
        registerNumber = uniqueGenerateNumber(registerNumbers)
        registerNumbers.append(registerNumber)
        if typeTS == 'легковой автомобиль' and p > 10 :
            brandTS = choice(markaLAuto)
            colorTS = choice(color)
            yearTS = fake.date()
            break
        elif typeTS == 'грузовой автомобиль' and p > 20:
            brandTS = choice(markaGAuto)
            colorTS = choice(color)
            yearTS = fake.date()
            break
        elif typeTS == 'мотоцикл' and p > 10:
            brandTS = choice(markaMotocycle)
            colorTS = choice(color)
            yearTS = fake.date()
            break
        elif typeTS == 'автобус' and p > 30:
            brandTS = choice(markaBus)
            colorTS = choice(color)
            yearTS = fake.date()
            break
        elif typeTS == 'троллейбус' and p > 30:
            brandTS = choice(markaBus)
            colorTS = choice(color)
            yearTS = fake.date()
            break
        elif typeTS == 'трамвай' and p > 30:
            brandTS = choice(markaBus)
            colorTS = choice(color)
            yearTS = fake.date()
            break
        elif typeTS == 'поезд' and p > 70:
            brandTS = choice(markaTrain)
            colorTS = choice(color)
            yearTS = fake.date()
            break
        elif typeTS == 'гужевой транспорт' and p > 80:
            brandTS = choice(markaAnimal)
            colorTS = 'null'
            yearTS = 'null'
            break
        elif typeTS == 'велосипед' and p > 80:
            brandTS = choice(markaBicycle)
            colorTS = choice(color)
            yearTS = 'null'
            break

    return dict(ownerId=ownerId, typeTs=typeTS,
                brandTs=brandTS, colorTS = colorTS,
                yearTs=yearTS, registerNumber=registerNumber)

def generateManyTS(people, count = 1000):
    ts = []
    registerNumbers = []
    for _ in range(count):
        ts.append(generateOneTS(people, registerNumbers))
    return ts

region = [
'Республика Адыгея',
 'Республика Алтай',
'Алтайский край',
'Амурская область',
'Архангельская область',
'Астраханская область',
'Республика Башкортостан',
'Белгородская область',
'Брянская область',
'Республика Бурятия',
'Владимирская область',
'Волгоградская область',
'Вологодская область',
'Воронежская область',
'Республика Дагестан',
'Еврейская АО',
'Забайкальский край',
'Ивановская область',
'Республика Игушетия',
'Иркутская область',
'Кабардино-Балкария',
'Калининградская область',
'Республика Калмыкия',
'Калужская область',
'Камчатский край',
'Карачаево-Черкесия',
'Республика Карелия',
'Кемеровская область',
'Кировская область',
'Республика Коми',
'Костромская область',
'Краснодарский край',
'Красноярский край',
'Республика Крым',
'Севастополь',
'Курганская область',
'Курская область',
'Ленинградская область',
'Липецкая область',
'Магаданская область',
'Республика Марий Эл',
'Республика Мордовия',
'Москва',
'Московская область',
'Мурманская область',
'Ненецкий АО',
'Нижегородская область',
'Новгородская область',
'Новосибирская область',
'Омская область',
'Оренбургская область',
'Орловская область',
'Пензенская область',
'Пермский край',
'Приморский край',
'Псковская область',
'Ростовская область',
'Рязанская область',
'Самарская область',
'Санкт-Петербург',
'Саратовская область',
'Сахалинская область',
'Свердловская область',
'Республика Северная Осетия - Алания',
'Смоленская область',
'Ставропольский край',
'Тамбовская область',
'Республика Татарстан',
'Тверская область',
'Томская область',
'Тульская область',
'Республика Тыва',
'Тюменская область',
'Удмуртская Республика',
'Ульяновская область',
'Хабаровский край',
'Республика Хакасия',
'Ханты-Мансийский АО',
'Челябинская область',
'Республика Чечня',
'Чувашская Республика',
'Чукотский АО',
'Республика Саха (Якутия)',
'Ямало-Ненецкий АО',
'Ярославская область']

city = [[] for i in range(85)]
def readCity():
    f = open('city.txt')
    for line in f:
        newline = line.replace('),\n', '')
        newline = newline.replace('(', '')
        newline = newline.replace(';', '')
        newline = newline.replace(')', '')
        newline = newline.replace("'", '')
        tmp = newline.split(', ')
        city[int(tmp[1])-1].append(tmp[2])

def generateDateDtp(year = '2021'):
    if year == '2021':
        month = randint(1, 5)
        if month == 2:
            day = randint(1, 28)
        elif month == 4:
            day = randint(1, 30)
        else:
            day = randint(1, 31)
    else:
        month = randint(1, 12)
        if month == 2:
            if year == '2020':
                day = randint(1, 29)
            else:
                day = randint(1, 28)
        elif month == 4 or month == 6 or month == 9 or month == 11:
            day = randint(1, 30)
        else:
            day = randint(1, 31)

    if month < 10:
        month = '0' + str(month)
    else:
        month = str(month)

    if day < 10:
        day = '0' + str(day)
    else:
        day = str(day)

    return year + '-' + month + '-' + day


def generateTime():
    hour = randint(0, 23)
    if hour < 10:
        hour = '0' + str(hour)
    else:
        hour = str(hour)

    minute = randint(0, 59)
    if minute < 10:
        minute = '0' + str(minute)
    else:
        minute = str(minute)

    return hour + ':' + minute


def generateDTP(count = 1000):
    dtp = []
    for i in range(count):
        regionIndex = randint(0, 84)
        dtp.append(dict(date=generateDateDtp('2018'), time=generateTime(),
                region=region[regionIndex], city = city[regionIndex][randint(0, len(city[regionIndex]) - 1)]))

    for i in range(count):
        regionIndex = randint(0, 84)
        dtp.append(dict(date=generateDateDtp('2019'), time=generateTime(),
                        region=region[regionIndex], city=city[regionIndex][randint(0, len(city[regionIndex]) - 1)]))

    for i in range(count):
        regionIndex = randint(0, 84)
        dtp.append(dict(date=generateDateDtp('2020'), time=generateTime(),
                        region=region[regionIndex], city=city[regionIndex][randint(0, len(city[regionIndex]) - 1)]))

    for i in range(count//2):
        regionIndex = randint(0, 84)
        dtp.append(dict(date=generateDateDtp('2018'), time=generateTime(),
                        region=region[regionIndex], city=city[regionIndex][randint(0, len(city[regionIndex]) - 1)]))

    return dtp

takeDTP = []
deathPeople = []
dt = []

def generateDriver(dtpId, people, ts):
    types = ['легковой автомобиль', 'грузовой автомобиль', 'мотоцикл', 'троллейбус',
             'автобус', 'трамвай', 'поезд']
    while True:
        randomTs = randint(0, len(ts) - 1)
        if ts[randomTs]['typeTs'] in types:
            break
    while True:
        randomPeople = randint(0, len(people) - 1)
        if people[randomPeople]['driverLicense'] != 'null' and randomPeople not in deathPeople:
            break

    health = choice(['погиб', 'ранен', 'здоров'])
    guilty = choice(['виновен', 'невиновен'])
    if health == 'погиб':
        deathPeople.append(randomPeople)

    return dict(dtpId=dtpId, personId=randomPeople, tsIs = randomTs, health =health, guilty = guilty)


def generateAnimal(dtpId, people, ts):
    randomTs = choice([ts[i] for i in range(len(ts)) if ts[i]['typeTs'] == 'гужевой транспорт'])
    while True:
        randomPeople = randint(0, len(people) - 1)
        if people[randomPeople]['driverLicense'] != 'null' and randomPeople not in deathPeople:
            break

    health = choice(['погиб', 'ранен', 'здоров'])
    guilty = choice(['виновен', 'невиновен'])
    if health == 'погиб':
        deathPeople.append(randomPeople)

    return dict(dtpId=dtpId, personId=randomPeople, tsIs = randomTs, health =health, guilty = guilty)


def generatePassenger(dtpId, people):
    while True:
        randomPeople = randint(0, len(people) -1)
        if randomPeople not in deathPeople:
            break

    health = choice(['погиб', 'ранен', 'здоров'])
    guilty = choice(['виновен', 'невиновен'])
    if health == 'погиб':
        deathPeople.append(randomPeople)

    return dict(dtpId=dtpId, personId=randomPeople, typePerson='пассажир', health=health, guilty=guilty)

def generatePeshehod(dtpId, people):
    while True:
        randomPeople = randint(0, len(people) - 1)
        if randomPeople not in deathPeople:
            break

    health = choice(['погиб', 'ранен', 'здоров'])
    guilty = choice(['виновен', 'невиновен'])
    if health == 'погиб':
        deathPeople.append(randomPeople)

    return dict(dtpId=dtpId, personId=randomPeople, typePerson='пешеход', health=health, guilty=guilty)


def generateByciclist(dtpId, people, ts):
    randomTs = choice([ts[i] for i in range(len(ts)) if ts[i]['typeTs'] == 'велосипед'])
    while True:
        randomPeople = randint(0, len(people) - 1)
        if randomPeople not in deathPeople:
            break

    health = choice(['погиб', 'ранен', 'здоров'])
    guilty = choice(['виновен', 'невиновен'])
    if health == 'погиб':
        deathPeople.append(randomPeople)

    return dict(dtpId=dtpId, personId=randomPeople, tsIs=randomTs, health=health, guilty=guilty)


drivers = []
others = []

def typeDtp(dtpId, people, ts):
    dt1 = []
    while True:
        countCategory = randint(1, 2)
        print('cc', countCategory)
        if countCategory == 1:
            category = randint(0, 9)
            p = randint(0, 100)
            print('c', category)
            print('p', p)
            if category == 0 and p > 0 :
                countDrivers = randint(2, 3)
                for i in range(countDrivers):
                    drivers.append(generateDriver(dtpId, people, ts))

                countPassengers = randint(0, 4)
                for i in range(countPassengers):
                    others.append(generatePassenger(dtpId,people))
                dt1.append(category)
                dt.append(dt1)
                break
            elif category == 1 and p > 40:
                drivers.append(generateDriver(dtpId, people, ts))
                countPassengers = randint(0, 4)
                for i in range(countPassengers):
                    others.append(generatePassenger(dtpId,people))
                dt1.append(category)
                dt.append(dt1)
                break
            elif category == 2 and p > 20:
                drivers.append(generateDriver(dtpId, people, ts))
                countPassengers = randint(0, 2)
                for i in range(countPassengers):
                    others.append(generatePassenger(dtpId, people))
                dt1.append(category)
                dt.append(dt1)
                break
            elif category == 3 and p > 30:
                countPassengers = randint(0, 2)
                for i in range(countPassengers):
                    others.append(generatePassenger(dtpId, people))
                dt1.append(category)
                dt.append(dt1)
                break
            elif category == 4 and p > 30:
                countPeshehod = randint(0, 2)
                for i in range(countPeshehod):
                    others.append(generatePeshehod(dtpId, people))
                dt1.append(category)
                dt.append(dt1)
                break
            elif category == 5 and p > 60:
                drivers.append(generateDriver(dtpId, people, ts))
                drivers.append(generateByciclist(dtpId, people, ts))
                dt1.append(category)
                dt.append(dt1)
                break
            elif category == 6 and p > 80:
                drivers.append(generateDriver(dtpId, people, ts))
                drivers.append(generateAnimal(dtpId, people, ts))
                dt1.append(category)
                dt.append(dt1)
                break
            elif category == 7 and p > 80:
                drivers.append(generateDriver(dtpId, people, ts))
                others.append(generatePassenger(dtpId, people))
                dt1.append(category)
                dt.append(dt1)
                break
            elif category == 8 and p > 80:
                drivers.append(generateDriver(dtpId, people, ts))
                break
            elif category == 9 and p > 70:
                drivers.append(generateDriver(dtpId, people, ts))
                others.append(generatePassenger(dtpId, people))
                dt1.append(category)
                dt.append(dt1)
                break
        else:
            countDrivers = randint(2, 3)
            for i in range(countDrivers):
                drivers.append(generateDriver(dtpId, people, ts))
            countPassengers = randint(0, 5)
            for i in range(countPassengers):
                others.append(generatePassenger(dtpId, people))
            dt1.append(0)
            dt1.append(1)
            dt.append(dt1)
            break



def typesDtp(dtp, people, ts):
    for i in range(len(dtp)):
        typeDtp(i, people, ts)

if __name__ == '__main__':
   readCity()
   people = generatePeople(10000)
   ts = generateManyTS(people, 10000)
   dtp = generateDTP(1000)
   typesDtp(dtp, people, ts)
   print(drivers)
   print(others)
   print(dt)

# See PyCharm help at https://www.jetbrains.com/help/pycharm/
