# Generated by Django 4.1.7 on 2023-04-27 11:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("employee", "0003_alter_task_difficulty"),
    ]

    operations = [
        migrations.AddField(
            model_name="team",
            name="description",
            field=models.CharField(default="", max_length=100),
            preserve_default=False,
        ),
    ]
