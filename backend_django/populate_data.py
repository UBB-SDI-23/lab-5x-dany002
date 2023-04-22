import random

import faker
from datetime import date

if __name__ == "__main__":
    from faker import Faker

    fake = Faker()
    n = 5
    with open('populate_team.sql', 'w') as f:
        f.write('INSERT INTO employee_team(created,"nameOfTeam","freePlaces",purpose,admin,rating) VALUES \n')
        for _ in range(n-1):
            f.write("('" + date.today().strftime("%Y-%m-%d") + "','" + fake.name() + "'," + random.randint(0,100).__str__() + ",'" + fake.paragraph() + "','" + fake.name() + "'," + random.randint(1,10).__str__() + '),\n')
        f.write("('" + date.today().strftime("%Y-%m-%d") + "','" + fake.name() + "'," + random.randint(0,100).__str__() + ",'" + fake.paragraph() + "','" + fake.name() + "'," + random.randint(1, 10).__str__() + ');\n')