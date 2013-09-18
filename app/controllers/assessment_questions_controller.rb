#
# Copyright (C) 2011 Instructure, Inc.
#
# This file is part of Canvas.
#
# Canvas is free software: you can redistribute it and/or modify it under
# the terms of the GNU Affero General Public License as published by the Free
# Software Foundation, version 3 of the License.
#
# Canvas is distributed in the hope that it will be useful, but WITHOUT ANY
# WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
# A PARTICULAR PURPOSE. See the GNU Affero General Public License for more
# details.
#
# You should have received a copy of the GNU Affero General Public License along
# with this program. If not, see <http://www.gnu.org/licenses/>.
#

class AssessmentQuestionsController < ApplicationController
  before_filter :require_context
  before_filter :require_bank
  def create
    if authorized_action(@bank.assessment_questions.new, @current_user, :create)
      params[:assessment_question] ||= {}
      params[:assessment_question].delete(:assessment_question_bank_id)
      params[:assessment_question][:form_question_data] ||= params[:question]
      @question = @bank.assessment_questions.build(params[:assessment_question])
      if @question.with_versioning(&:save)

        @question.question_data[:answers].each do |answer|
          if !answer[:misconception_id].empty?
            misconceptions = JSON.parse(answer[:misconception_id])
            misconceptions.each do |miscon_id, value|
              misconception = AssessmentMisconception.find(miscon_id.to_i)
              pattern = misconception.pattern

              answer_id = {}

              answer_id["#{answer[:id]}"] = misconceptions["#{miscon_id}"]

              if pattern.empty?
                pattern.merge!({"#{@question.id}"=>answer_id})
              else
                answer_id.merge!(pattern["#{@question.id}"]) unless pattern["#{@question.id}"].nil?
                pattern.merge!({"#{@question.id}"=>answer_id})
              end
              misconception.pattern = pattern
              misconception.save!
            end
          end
        end

        @question.insert_at_bottom
        render :json => @question.to_json
      else
        render :json => @question.errors.to_json, :status => :bad_request
      end
    end
  end

  def update
    @question = @bank.assessment_questions.find(params[:id])
    if authorized_action(@question, @current_user, :update)
      #
      # grab the old misconception data in case we need to revert
      old_answers = @question.question_data[:answers]

      params[:assessment_question] ||= {}
      # changing the question bank id needs to use the move action, below
      params[:assessment_question].delete(:assessment_question_bank_id)
      params[:assessment_question][:form_question_data] ||= params[:question]
      @question.edited_independent_of_quiz_question
      if @question.with_versioning { @question.update_attributes(params[:assessment_question]) }
        @question.ensure_in_list


        #
        # check the totals and make sure each misconception for all the question answers
        # adds up to exactly 1
        totals = {}
        ok_to_proceed = true
        @question.question_data[:answers].each do |answer|
          if !answer[:misconception_id].empty?
            misconceptions = JSON.parse(answer[:misconception_id])
            misconceptions.each do |miscon_id, value|
              if totals["#{miscon_id}"].nil?
                totals["#{miscon_id}"] = value
              else
                num = totals["#{miscon_id}"].to_f
                num += value.to_f
                totals.merge!("#{miscon_id}" => num)
                ok_to_proceed = false unless value.to_i==1 || value.to_i==0
              end
            end
          end
        end

        totals.each { |miscon_id,value| ok_to_proceed = false unless value.to_i==1 || value.to_i==0 }

        if ok_to_proceed
          # remove the old references
          @bank.assessment_misconceptions.active.each do |misconception|
            miscon = misconception.pattern
            miscon.delete("#{@question.id}")
            misconception.pattern = miscon
            misconception.save!
          end

          @question.question_data[:answers].each do |answer|
            if !answer[:misconception_id].empty?
              misconceptions = JSON.parse(answer[:misconception_id])
              misconceptions.each do |miscon_id, value|
                misconception = AssessmentMisconception.find(miscon_id.to_i)
                pattern = misconception.pattern

                answer_id = {}

                answer_id["#{answer[:id]}"] = misconceptions["#{miscon_id}"]

                if pattern.empty?
                  pattern.merge!({"#{@question.id}"=>answer_id})
                else
                  answer_id.merge!(pattern["#{@question.id}"]) unless pattern["#{@question.id}"].nil?
                  pattern.merge!({"#{@question.id}"=>answer_id})
                end
                misconception.pattern = pattern
                misconception.save!
              end
            end
          end
        else
          #
          # revert the to misconception data
          @question.question_data[:answers].each_with_index do |answer, index|
            answer[:misconception_id] = old_answers[index][:misconception_id]
          end
          @question.save!
        end


        render :json => @question.to_json
      else
        render :json => @question.errors.to_json, :status => :bad_request
      end
    end
  end

  def destroy
    @question = @bank.assessment_questions.find(params[:id])
    if authorized_action(@question, @current_user, :delete)

      # remove the old references
      @bank.assessment_misconceptions.active.each do |misconception|
        miscon = misconception.pattern
        miscon.delete("#{@question.id}")
        misconception.pattern = miscon
        misconception.save!
      end

      @question.destroy
      render :json => @question.to_json
    end
  end

  def move
    @question = @context.assessment_questions.find(params[:assessment_question_id])
    # Note that a question might be moved to a question bank in another context, so we don't
    # want to scope this lookup to the context. We check permissions on the question bank below.
    @new_bank = AssessmentQuestionBank.find(params[:assessment_question_bank_id])
    if authorized_action(@question, @current_user, :delete) && authorized_action(@new_bank, @current_user, :manage)
      @new_question = @question
      if params[:move] != '1'
        @new_question = @question.clone_for(@new_bank)
      end
      @new_question.assessment_question_bank = @new_bank
      @new_question.save
      render :json => @new_question.to_json
    end
  end

  private
  def require_bank
    @bank = @context.assessment_question_banks.active.find(params[:question_bank_id])
  end
end
