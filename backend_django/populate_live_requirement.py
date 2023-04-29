import faker

if __name__ == "__main__":
    from faker import Faker

    fake = Faker()
    n = 1000000
    with open('populate_team_feature.sql', 'w') as f:
        f.write("INSERT INTO employee_team(description) VALUES \n");
        for i in range(n):
            f.write("('" + fake.text(max_nb_chars=30).replace('\n',' ') + "')," + '\n')
            if i % 1000 == 0:
                print(i,"/",n)

