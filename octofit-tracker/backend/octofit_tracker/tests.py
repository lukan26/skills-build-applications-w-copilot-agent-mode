from django.test import TestCase
from .models import User, Team, Activity, Workout, Leaderboard
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status

class ModelTests(TestCase):
    def setUp(self):
        self.team = Team.objects.create(name='Test Team', description='A test team')
        self.user = User.objects.create(name='Test User', email='test@example.com', team=self.team)
        self.workout = Workout.objects.create(name='Test Workout', description='A test workout')
        self.activity = Activity.objects.create(user=self.user, activity_type='Test', duration_minutes=10, date='2025-01-01')
        self.leaderboard = Leaderboard.objects.create(team=self.team, total_points=50)

    def test_user_str(self):
        self.assertEqual(str(self.user), 'Test User')
    def test_team_str(self):
        self.assertEqual(str(self.team), 'Test Team')
    def test_activity_str(self):
        self.assertIn('Test User', str(self.activity))
    def test_workout_str(self):
        self.assertEqual(str(self.workout), 'Test Workout')
    def test_leaderboard_str(self):
        self.assertIn('Test Team', str(self.leaderboard))

class APITests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.team = Team.objects.create(name='API Team', description='API test team')
        self.user = User.objects.create(name='API User', email='api@example.com', team=self.team)

    def test_api_root(self):
        response = self.client.get(reverse('api-root'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
    def test_users_endpoint(self):
        response = self.client.get('/users/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
    def test_teams_endpoint(self):
        response = self.client.get('/teams/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
