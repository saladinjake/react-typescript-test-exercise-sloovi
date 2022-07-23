import { fireEvent, getAllByTestId, getByTestId, getByText, screen } from "@testing-library/react"

interface TaskProps {
  id?:string;
  assigned_user: string; //<id value from /team api response >,
  task_date: string; //<date in 'YYYY-MM-DD' format from date field in task>,
  task_time: number; //<time from time field in task>,integer ,(for ex=01:30am means 5400 seconds)
  is_completed: number; //<0 or 1 integer data type>,
  time_zone: number; //<Give timezone value in seconds and data type is integer>,(for ex= +05:30 means 19800 seconds)
  task_msg: string; //<task description from task description field in task>
}

const waitFor =  (cb: ()=>void)=>{
      setTimeout(() =>{
          cb()
      },5000)
}

class PageObject {
    async loaderDisappears(){
         waitFor(() => {
            expect(screen.queryByText('loading')).not.toBeInTheDocument()
        })
    }

    clickAddButton(){
        const addMovieBtn = screen.getByText(/Task/i);
        fireEvent.click(addMovieBtn);
    }

    clickSubmitButton(){
        const submitBtn = screen.getByText(/Submit/i);
        fireEvent.click(submitBtn)
    }

    clickCancelButton(){
        const submitBtn = screen.getByText(/Cancel/i);
        fireEvent.click(submitBtn)
    }

    private formFields = ['task_msg', 'task_date', 'task_time', 'time_zone', "assigned_user"]

    expectNewTaskFormVisible(){
        for (const fieldName of this.formFields) {
            screen.getByPlaceholderText(`Enter ${fieldName}`)
        }
    }

    fillNewTaskForm(formData: TaskProps){
        for (const [fieldName, value] of Object.entries(formData)) {
            const formElement = screen.getByPlaceholderText(`Enter ${fieldName}`)
            fireEvent.change(formElement, { target: { value } })
        }
    }

    expectTextVisible(...phrases: (RegExp | string)[]){
        for (const phrase of phrases){
            const element = screen.getByText(phrase)
            expect(element).toBeInTheDocument()
        }
    }

    private getTaskCard(taskId: TaskProps['id']){
        return screen.getByTestId(`task-item-${taskId}`)
    }

    
    clickDeleteTaskButton(taskId: TaskProps['id']){
        const deleteBtn = getByText(this.getTaskCard(taskId), 'Delete')
        fireEvent.click(deleteBtn)
    }

    expectTaskVisibleCount(count: number){
        expect(screen.queryAllByTestId(/task-item/)).toHaveLength(count)
    }
}

export const MoviesPageObject = new PageObject();
