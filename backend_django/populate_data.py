import random

import faker
from datetime import date

if __name__ == "__main__":
    from faker import Faker

    fake = Faker()
    n = 1000000

    with open('populate_team.csv', 'w') as f:
        for i in range(n):
            f.write("'" + date.today().strftime("%Y-%m-%d") + "','" + fake.name() + "'," + random.randint(0,100).__str__() + ",'" + fake.text(max_nb_chars=50).replace('\n',' ') + "','" + fake.name() + "'," + random.randint(1,10).__str__() + '\n')
            print(i,"/",n)

    with open('populate_projects.csv', 'w') as f:
        statues = ['in progress', 'finished', 'pending']

        for i in range(n):
            f.write("'" + date.today().strftime("%Y-%m-%d") + "','" + fake.name() + "','" + fake.name() + "'," + random.randint(0,100000).__str__() + ",'" + fake.text(max_nb_chars=50).replace('\n',' ') + "','" + fake.random_element(elements=statues) + "'\n")
            print(i, "/", n)

    with open('populate_tasks.csv', 'w') as f:
        for i in range(10*n):
            f.write("'" + date.today().strftime("%Y-%m-%d") + "','" + fake.name() + "'," + random.randint(1,10).__str__() + "," + random.randint(1,n).__str__() + "," + random.randint(1,n).__str__() + "\n")
            print(i, "/", 10*n)
