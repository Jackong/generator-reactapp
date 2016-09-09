import { expect } from 'chai';
import { call, put } from 'redux-saga/effects';
import sinon from 'sinon';
const { describe, it } = global;

import { callAPI, modelize } from '../../sagas/api';
import { action, ERROR } from '../../actions';
import { FAILURE, SUCCESS } from '../../constants/code';

describe('sagas', () => {
  describe('callAPI', () => {
    describe('with error request', () => {
      it('should be caught', () => {
        const payload = null;
        const error = new Error('oops');
        const meta = {
          api: sinon.spy(),
        };
        const gen = callAPI({ payload, meta });
        expect(gen.next().value).to.be.eql(
          call(meta.api, payload)
        );

        expect(gen.next(error).value).to.be.eql(
          put(action(ERROR.CATCH, error))
        );

        expect(gen.next()).to.be.eql({
          done: true,
          value: undefined,
        });
      });
    });

    describe('with failure code', () => {
      it('should be fail', () => {
        const payload = null;
        const data = {
          code: FAILURE,
        };
        const res = {
          body() {
            return {
              data() {
                return data;
              },
            };
          },
        };
        const meta = {
          api: sinon.spy(),
          types: {
            FAILURE: 'FAILURE',
          },
        };
        const gen = callAPI({ payload, meta });

        expect(gen.next().value).to.be.eql(
          call(meta.api, payload)
        );

        expect(gen.next(res).value).to.be.eql(
          put(action(meta.types.FAILURE, payload, data))
        );

        expect(gen.next()).to.be.eql({
          done: true,
          value: undefined,
        });
      });
    });

    describe('when schemas not found with success code', () => {
      it('should be success', () => {
        const payload = null;
        const data = {
          code: SUCCESS,
        };
        const res = {
          body() {
            return {
              data() {
                return data;
              },
            };
          },
        };
        const meta = {
          api: sinon.spy(),
          types: {
            SUCCESS: 'SUCCESS',
          },
        };
        const gen = callAPI({ payload, meta });

        expect(gen.next().value).to.be.eql(
          call(meta.api, payload)
        );

        expect(gen.next(res).value).to.be.eql(
          put(action(meta.types.SUCCESS, payload, data))
        );

        expect(gen.next()).to.be.eql({
          done: true,
          value: undefined,
        });
      });
    });

    describe('when schemas found with success code', () => {
      it('should be modelize', () => {
        const payload = null;
        const data = {
          code: SUCCESS,
        };
        const res = {
          body() {
            return {
              data() {
                return data;
              },
            };
          },
        };
        const meta = {
          api: sinon.spy(),
          types: {
            SUCCESS: 'SUCCESS',
          },
          schemas: {
            task: sinon.spy(),
          },
        };

        const gen = callAPI({ payload, meta });

        expect(gen.next().value).to.be.eql(
          call(meta.api, payload)
        );

        expect(gen.next(res).value).to.be.eql(
          call(modelize, data, meta.schemas)
        );

        const result = {};
        const entities = {};

        expect(gen.next({ result, entities }).value).to.be.eql(
          put(action(meta.types.SUCCESS, { result, entities }))
        );

        expect(gen.next()).to.be.eql({
          done: true,
          value: undefined,
        });
      });
    });
  });
});
