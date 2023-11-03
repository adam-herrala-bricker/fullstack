import { render, screen } from '@testing-library/react-native'
import { repositories } from '../../utils/testDummyData'
import { RepositoryListContainer } from '../../components/RepositoryList'
import { shortenInteger } from '../../utils/helperFunctions' //same function the component gets

describe('RepositoryList', () => {
    describe('prelim tests', () => {
        
        it('tests initialize correctly', () => {
            expect(1).toBe(1)
        })

        it('dummy data imported as expected', () => {
            const firstID = repositories.edges[0].node.id
            expect(firstID).toBe('jaredpalmer.formik')
        })
    })

    describe('RepositoryListContainer', () => {

        //renders the RepositoryListContainer component before every test
        let firstRepositoryItem, secondRepositoryItem
        beforeEach(() => {
            render(<RepositoryListContainer repositories = { repositories }/>)
            const repositoryItems = screen.getAllByTestId('repositoryItem');
            [firstRepositoryItem, secondRepositoryItem] = repositoryItems;
        })

        it('repository name', () => {
            //screen.debug() //shows the full structure of the rendered thing

            //note: could make it so that the text content isn't hard-coded in, but rather comes directly
            //from the repo dummy data, however it's unclear whether that's actually a good idea here
            expect(firstRepositoryItem).toHaveTextContent('jaredpalmer/formik')
            expect(secondRepositoryItem).toHaveTextContent('async-library/react-async')
        })

        it('repository description', () => {
            expect(firstRepositoryItem).toHaveTextContent('Build forms in React, without the tears')
            expect(secondRepositoryItem).toHaveTextContent('Flexible promise-based React data loader')
        })

        it('repository language', () => {
            expect(firstRepositoryItem).toHaveTextContent('TypeScript')
            expect(secondRepositoryItem).toHaveTextContent('JavaScript')
        })

        it('repository forks count', () => {
            expect(firstRepositoryItem).toHaveTextContent(shortenInteger(1619))
            expect(secondRepositoryItem).toHaveTextContent(shortenInteger(69))
        })

        it('repository stargazers count', () => {
            expect(firstRepositoryItem).toHaveTextContent(shortenInteger(21856))
            expect(secondRepositoryItem).toHaveTextContent(shortenInteger(1760))
        })

        it('repository rating average', () => {
            expect(firstRepositoryItem).toHaveTextContent(shortenInteger(88))
            expect(secondRepositoryItem).toHaveTextContent(shortenInteger(72))
        })

        it('repository review count', () => {
            expect(firstRepositoryItem).toHaveTextContent(shortenInteger(3))
            expect(secondRepositoryItem).toHaveTextContent(shortenInteger(3))
        })
    })
})