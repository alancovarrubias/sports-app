class SessionsController < ApplicationController
  def create
    if user = AuthenticateUser.call(session_params[:username], session_params[:password])
      render json: { user: user }, status: :created
    else
      render json: { error: 'Invalid credentials' }, status: :unauthorized
    end
  end

  def destroy
    session[:user_id] = nil
    head :ok
  end

  private

  # Only allow a list of trusted parameters through.
  def session_params
    params.require(:user).permit(:username, :password)
  end
end
