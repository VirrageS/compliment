# Generated by Django 2.0.5 on 2018-05-19 22:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Message',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('sender_id', models.IntegerField()),
                ('receiver_id', models.IntegerField()),
                ('content', models.CharField(blank=True, max_length=250)),
                ('send_time', models.DateTimeField()),
                ('longitude', models.FloatField()),
                ('latitude', models.FloatField()),
                ('seen', models.BooleanField(default=False)),
            ],
        ),
    ]
