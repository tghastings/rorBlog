class Api::V1::PostsController < ApplicationController
  before_action :authenticate_user!, only: [:create, :destroy, :update]
  def index
    post = Post.all.order(created_at: :desc)
    render json: post
  end

  def create
    post = Post.create!(post_params)
    if post
      render json: post
    else
      render json: post.errors
    end
  end

  def update
    post.update!(post_params)
    render json: { slug: post.slug }
  end

  def show
    if postBySlug
      render json: postBySlug
    else
      render json: { message: 'Post not found!' }
    end
  end

  def destroy
    post&.destroy
    render json: { message: 'Post deleted!' }
  end
  private

  def post_params
    params.require(:post).permit(:title, :date, :author, :content, :tags, :id)
  end

  def post
    post ||= Post.find(params[:id])
  end
  
  def postBySlug
    post ||= Post.find_by slug: params[:slug]
  end
end