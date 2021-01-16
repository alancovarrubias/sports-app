class SessionsController < ApplicationController
  protect_from_forgery except: :create
  def create
    if @user = User.authenticate(session_params[:username], session_params[:password])
      session[:user_id] = @user.id
      render status: :created
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
