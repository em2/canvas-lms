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

class QuizQuestionsController < ApplicationController
  before_filter :require_context, :get_quiz

  def show
    if authorized_action(@quiz, @current_user, :update)
      @question = @quiz.quiz_questions.find(params[:id])
      render :json => @question.to_json(:include => :assessment_question)
    end
  end
  
  def create
    if authorized_action(@quiz, @current_user, :update)
      if params[:existing_questions]
        return add_questions
      end
      question_data = params[:question]
      question_data ||= {}
      if question_data[:quiz_group_id]
        @group = @quiz.quiz_groups.find(question_data[:quiz_group_id])
      end
      @question = @quiz.quiz_questions.create(:quiz_group => @group, :question_data => question_data)
      @quiz.did_edit if @quiz.created?

      @question.question_data[:answers].each do |answer|
        if !answer[:misconception_id].empty?
          misconceptions = JSON.parse(answer[:misconception_id])
          misconceptions.each do |miscon_id, value|
            misconception = QuizMisconception.find(miscon_id.to_i)
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
      
      render :json => @question.to_json(:include => :assessment_question)
    end
  end
  
  def add_questions
    find_bank(params[:assessment_question_bank_id]) do
      @assessment_questions = @bank.assessment_questions.active.find_all_by_id(params[:assessment_questions_ids].split(",")).compact
      @group = @quiz.quiz_groups.find_by_id(params[:quiz_group_id]) if params[:quiz_group_id].to_i > 0
      @questions = @quiz.add_assessment_questions(@assessment_questions, @group)
      render :json => @questions.to_json
    end
  end
  protected :add_questions

  def update
    if authorized_action(@quiz, @current_user, :update)
      @question = @quiz.quiz_questions.find(params[:id])

      #
      # grab the old misconception data in case we need to revert
      old_answers = @question.question_data[:answers]

      question_data = params[:question]
      question_data ||= {}
      if question_data[:quiz_group_id]
        @group = @quiz.quiz_groups.find(question_data[:quiz_group_id])
        if question_data[:quiz_group_id] != @question.quiz_group_id
          @question.quiz_group_id = question_data[:quiz_group_id]
          @question.position = @group.quiz_questions.length
        end
      end
      @question.question_data = question_data
      @question.save
      @quiz.did_edit if @quiz.created?


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
        #
        # remove the old references 
        @quiz.quiz_misconceptions.active.each do |misconception|
          miscon = misconception.pattern
          miscon.delete("#{@question.id}")
          misconception.pattern = miscon
          misconception.save!
        end

        @question.question_data[:answers].each do |answer|
          if !answer[:misconception_id].empty?
            misconceptions = JSON.parse(answer[:misconception_id])
            misconceptions.each do |miscon_id, value|
              misconception = QuizMisconception.find(miscon_id.to_i)
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
      end
      
      render :json => @question.to_json(:include => :assessment_question)
    end
  end

  def destroy
    if authorized_action(@quiz, @current_user, :update)
      @question = @quiz.quiz_questions.find(params[:id])

      # remove the old references 
      @quiz.quiz_misconceptions.active.each do |misconception|
        miscon = misconception.pattern
        miscon.delete("#{@question.id}")
        misconception.pattern = miscon
        misconception.save!
      end

      @question.destroy
      render :json => @question.to_json
    end
  end
  
  def get_quiz
    @quiz = @context.quizzes.find(params[:quiz_id])
  end
  private :get_quiz
end
