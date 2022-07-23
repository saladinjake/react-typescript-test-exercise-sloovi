import { render } from '@testing-library/react'

import { mockTasks } from './data/testdata';
import App from '../App';

import { getTasks } from './api/tasks';
import { PageObject } from './PageObject';

jest.mock('./api/tasks');

describe('App Component', () => {

    it('should display header', async () => {
        // given
        (getTasks as jest.Mock).mockImplementation(async () => mockTasks)
        render(<App />);
        await PageObject.loaderDisappears();

        // then
        PageObject.expectTextVisible(/Sloovi/i);
    });

    it('should fetch tasks using the service', async () => {
        // given
        (getTasks as jest.Mock).mockImplementation(async () => mockTasks)
        render(<App />);
        await PageObject.loaderDisappears();

        // then
        expect(getTasks).toHaveBeenCalled();
    });

    it('should display current task', async () => {
        // given
        (getTasks as jest.Mock).mockImplementation(async () => mockTasks)
        render(<App />);
        await PageObject.loaderDisappears();

        // then
       // PageObject.getCurrentTaskClicked('i-got-the-job-role-senior-frontend-8949383-dev', "4.67");
    });

    /*it('should update the task after submit was clicked', async () => {
        // given
        (getTasks as jest.Mock).mockImplementation(async () => mockTasks)
        render(<App />);
        await PageObject.loaderDisappears();

        // when
        //PageObject.updateTask('i-got-the-job-role-senior-frontend-8949383-dev', 1);

        // then
        //PageObject.expectUpdatedTask('i-got-the-job-role-senior-frontend-8949383-dev', "3.75");
    });*/

    it('should add a new task after form was filled and submitted', async () => {
        // given
        (getTasks as jest.Mock).mockImplementation(async () => mockTasks)
        render(<App />);
        await PageObject.loaderDisappears();

        // then
        PageObject.expectMoviesVisibleCount(4);

        // when
        PageObject.clickAddMovieButton();
        PageObject.fillNewMovieForm({
            id: 'i-got-the-job-role-senior-frontend-8949383-dev', 
            task_msg: 'Be greatful to Allah',
            assigned_user: mockUsers[0].company_id,
            task_date: "2022-30-07",
            task_time: 3000,
            is_completed: 1,
            time_zone: 19800,
       })
        PageObject.clickSubmitButton();

        // then
        PageObject.expectMoviesVisibleCount(5);
        PageObject.expectTextVisible(/Add Movie/i)
       PageObject.expectTextVisible(
            /Be greatful to Allah/i,
            /i-got-the-job-role-senior-frontend-8949383-dev/i,
            /19800/i,
        )
    });
});
