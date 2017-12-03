class UsersController < ApplicationController

  def index
    @users = User.all
    gon.markerData = []
    @users.each do |user|
      lat = user.latitude
      lng = user.longitude
      name = user.nickname
      gon.markerData << { name: name, lat: lat, lng: lng }
    end
  end

  def show
    @user = User.find(params[:id])
  end

  def edit
    @user = current_user
  end

  def update
    @user = current_user
    @user.update(user_params)
    redirect_to @user
  end

  def search
    params[:search] ||= []
    @user = User.where("nickname LIKE(?)", "%#{params[:search]}%")
  end

  # def ajax
  #   @user = User.find(params[:user_id])
  #
  #   respond_to do |format|
  #     format.html
  #     format.json { render json: @user }
  #   end
  # end
  private
  def user_params
    params.require(:user).permit(:nickname, :image, :description, :address)
  end
end
