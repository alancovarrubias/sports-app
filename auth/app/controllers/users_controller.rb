class UsersController < ApplicationController
  protect_from_forgery except: :create
  def create
    @user = User.new(user_params)
    if @user.save
      render status: :created 
    else
      render json: { errors: @user.errors }, status: :unprocessable_entity
    end
  end

  private

  # Only allow a list of trusted parameters through.
  def user_params
    params.require(:user).permit(:username, :password)
  end
end
