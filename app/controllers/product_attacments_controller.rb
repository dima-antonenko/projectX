class ProductAttacmentController < ApplicationController
  before_action :set_product_attacment, only: [:show, :edit, :update, :destroy]

  # GET /product_attacments
  # GET /product_attacments.json
  def index
    @product_attacments = ProductAttacment.all
  end

  # GET /product_attacments/1
  # GET /product_attacments/1.json
  def show
  end

  # GET /product_attacments/new
  def new
    @product_attacment = ProductAttacment.new
  end

  # GET /product_attacments/1/edit
  def edit
  end

  # POST /product_attacments
  # POST /product_attacments.json
  def create
    @product_attacment = ProductAttacment.new(product_attacment_params)

    respond_to do |format|
      if @product_attacment.save
        format.html { redirect_to @product_attacment, notice: 'Product attacment was successfully created.' }
        format.json { render :show, status: :created, location: @product_attacment }
      else
        format.html { render :new }
        format.json { render json: @product_attacment.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /product_attacments/1
  # PATCH/PUT /product_attacments/1.json
  def update
    respond_to do |format|
      if @product_attacment.update(product_attacment_params)
        format.html { redirect_to @product_attacment, notice: 'Product attacment was successfully updated.' }
        format.json { render :show, status: :ok, location: @product_attacment }
      else
        format.html { render :edit }
        format.json { render json: @product_attacment.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /product_attacments/1
  # DELETE /product_attacments/1.json
  def destroy
    @product_attacment.destroy
    respond_to do |format|
      format.html { redirect_to product_attacments_url, notice: 'Product attacment was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_product_attacment
      @product_attacment = ProductAttacment.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def product_attacment_params
      params[:product_attacment].permit(:image)
    end
end
