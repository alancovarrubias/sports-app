require 'rails_helper'

RSpec.describe 'Authentication', type: :request do
  describe 'POST /auth/login' do
    let!(:user) { FactoryBot.create(:user, email: 'test@example.com', password: 'password') }

    it 'returns a JWT token on successful login' do
      post '/auth/login', params: { email: 'test@example.com', password: 'password' }
      expect(response).to have_http_status(:ok)
      expect(JSON.parse(response.body)).to have_key('token')
    end

    it 'returns an error message on failed login' do
      post '/auth/login', params: { email: 'test@example.com', password: 'wrong_password' }
      expect(response).to have_http_status(:unauthorized)
      expect(JSON.parse(response.body)).to have_key('error')
    end
  end

  describe 'GET /auth/verify' do
    let!(:user) { FactoryBot.create(:user) }
    let!(:token) { JWT.encode({ user_id: user.id }, Rails.application.secrets.secret_key_base) }

    it 'returns success and user_id for a valid token' do
      get '/auth/verify', headers: { 'Authorization' => "Bearer #{token}" }
      expect(response).to have_http_status(:ok)
      expect(JSON.parse(response.body)).to eq({ 'valid' => true, 'user_id' => user.id })
    end

    it 'returns unauthorized for an invalid token' do
      get '/auth/verify', headers: { 'Authorization' => 'Bearer invalid_token' }
      expect(response).to have_http_status(:unauthorized)
      expect(JSON.parse(response.body)).to eq({ 'valid' => false })
    end
  end
end
